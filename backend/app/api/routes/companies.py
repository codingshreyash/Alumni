from fastapi import APIRouter, HTTPException
from pydantic import ValidationError
from typing import Any
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Company, CompaniesPublic

router = APIRouter(prefix="/companies", tags=["companies"])

@router.get("/", response_model=CompaniesPublic)
def read_companies(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
):
    """
    retrieves companies
    """
    count_statement = (
            select(func.count())
            .select_from(Company)
        )
    count = session.exec(count_statement).one()

    statement = select(Company).select_from(Company)
    companies = session.exec(statement).all()
    
    return CompaniesPublic(data=companies, count=count)


@router.get("/{name}", response_model=Company)
def read_company(
    name: str, session: SessionDep, current_user: CurrentUser
):
    """
    retrieves company
    """
    db_company = session.get(Company, name)
    if not db_company:
        raise HTTPException(
            status_code=404,
            detail="The company with this name does not exist in the system",
        )
    return db_company


@router.post("/", response_model=Company)
def create_company(
    *, session: SessionDep, company_in: Company
) -> Any:
    """
    Create new company.
    """

    # try catch ValidationError??
    try:
        company = Company.model_validate(company_in)
    except ValidationError as e:
            raise HTTPException(
                status_code=400,
                detail=f"Validation error for interview data: {e.errors()}"
            )

    
    statement = select(Company).where(Company.name == company.name)
    old_company = session.exec(statement).first()
    if old_company:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )

    session.add(company)
    session.commit()
    session.refresh(company)
    return company
