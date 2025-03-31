from fastapi import APIRouter

from app.api.routes import companies, interviews, login, private, users, utils, emails
from app.core.config import settings

api_router = APIRouter()
api_router.include_router(emails.router)
api_router.include_router(companies.router)
api_router.include_router(interviews.router)
api_router.include_router(login.router)
api_router.include_router(users.router)
api_router.include_router(utils.router)
api_router.include_router(connections.router)


if settings.ENVIRONMENT == "local":
    api_router.include_router(private.router)