from typing import Any
from sqlmodel import col, delete, func, select
from fastapi import APIRouter, Depends, HTTPException
from app.models import (
    EmailBase,
    EmailsPublic,
    Email
)
from app.api.deps import (
    CurrentUser,
    SessionDep
)

router = APIRouter(prefix="/emails", tags=["emails"])

@router.post("/me", response_model=Email)
def add_email(*, session: SessionDep, current_user: CurrentUser, email_in: EmailBase) -> Any:
    """
    Add a new email to the current user.
    """
    # Check if the email already exists
    existing_email = session.get(Email, email_in.email)
    if existing_email:
        raise HTTPException(status_code=400, detail="This email is already in use.")
    
    # change the old preferred email if new one is preferred
    if email_in.preferred == True:
        old_preferred_email = session.exec(
            select(Email).where(Email.user_id == current_user.id, Email.preferred == True)
        ).one_or_none()
        if old_preferred_email:
            old_preferred_email.preferred = False
            session.add(old_preferred_email)

    # Create new email entry
    new_email = Email(
        email=email_in.email, 
        preferred=email_in.preferred, 
        user_id=current_user.id
    )
    session.add(new_email)
    session.commit()
    session.refresh(new_email)
    
    return new_email

@router.patch("/me/preferred", response_model=Email)
def change_preferred_email(*, session: SessionDep, current_user: CurrentUser, email_in: EmailBase) -> Any:
    """
    Change the preferred email of the current user.
    """
    # Change the old preferred email to not preferred
    old_preferred_email = session.exec(
        select(Email).where(Email.user_id == current_user.id, Email.preferred == True)
    ).one_or_none()

    if old_preferred_email and old_preferred_email.email == email_in.email:
        return old_preferred_email

    if old_preferred_email:
        old_preferred_email.preferred = False
        session.add(old_preferred_email)

    # Update the new preferred email
    new_preferred_email = session.exec(
        select(Email).where(Email.user_id == current_user.id, Email.email == email_in.email)
    ).one_or_none()

    if not new_preferred_email:
        raise HTTPException(status_code=404, detail="Email not found")

    new_preferred_email.preferred = True
    session.add(new_preferred_email)
    session.commit()
    session.refresh(new_preferred_email)

    return new_preferred_email

@router.get("/{user_id}", response_model=EmailsPublic)
def read_user_emails(*, session: SessionDep, current_user: CurrentUser, user_id: int):
    count_statement = select(func.count()).select_from(Email).where(Email.user_id == user_id)
    count = session.exec(count_statement).one()

    statement = select(Email).where(Email.user_id == user_id)
    emails = session.exec(statement).all()

    return EmailsPublic(data=emails, count=count)