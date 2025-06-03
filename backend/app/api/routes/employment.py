from fastapi import APIRouter, HTTPException
from pydantic import ValidationError
from typing import Any
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from sqlmodel import SQLModel, Field
from app.models import (
    Company, 
    CompaniesPublic, 
    User, 
    UsersPublic, 
    Employment, 
    EmploymentsCreate,
    EmploymentsPublic,
    EmploymentCounts,
    EmploymentsList
)

router = APIRouter(prefix="/employment", tags=["employment"])

@router.post("/", response_model=Employment)
def add_employment(
    *, session: SessionDep, employment_in: EmploymentsCreate, current_user: CurrentUser
) -> Any:
    """
    create new employment.
    """
    try:
        # create the company if it doesn't exist
        company = session.get(Company, employment_in.company_name)
        if not company:
            company = Company(name=employment_in.company_name)
            session.add(company)
            session.flush()

        # create employment with validated company
        employment = Employment.model_validate({
            **employment_in.model_dump(),
            "user_id": current_user.id
        })

        if employment.type != "full time" and employment.type != "internship":
            raise HTTPException(status_code=400, detail="Invalid employment type")

        session.add(employment)

        # update current_company if end date is None
        if employment.end is None:
            user = session.get(User, current_user.id)
            if user:
                user.current_company = employment.company_name
                session.add(user)

        session.commit()
        session.refresh(employment)
        return employment

    except ValidationError as e:
        raise HTTPException(
            status_code=400,
            detail=f"Validation error for employment data: {e.errors()}"
        )


@router.delete("/{id}", response_model=Employment)
def delete_employment(id: int, session: SessionDep, current_user: CurrentUser):
    '''
    delete an employment from profile
    '''
    employment = session.get(Employment, id)
    if not employment:
        raise HTTPException(status_code=404, detail="Employment not found")
    if employment.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this employment")

    user = session.get(User, current_user.id)
    if user and user.current_company == employment.company_name:
        user.current_company = None
        session.add(user)

    session.delete(employment)
    session.commit()
    return employment

@router.get("/", response_model=EmploymentsList)
def get_all_employments(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
):
    """
    Get all employments for the current user.
    """
    count_statement = (
        select(func.count())
        .select_from(Employment)
        .where(Employment.user_id == current_user.id)
    )
    count = session.exec(count_statement).one()

    statement = (
        select(Employment)
        .where(Employment.user_id == current_user.id)
        .offset(skip)
        .limit(limit)
    )
    employments = session.exec(statement).all()
    
    return EmploymentsList(data=employments, count=count)
