from fastapi import APIRouter, HTTPException
from pydantic import ValidationError
from typing import Any
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import ConnectionRequests
from datetime import datetime, timezone

router = APIRouter(prefix="/connections", tags=["connections"])

@router.post("/", response_model=ConnectionRequests)
async def create_connection_request(
    connection_request: ConnectionRequests,
    session: SessionDep,
    current_user: CurrentUser
) -> Any:
    if connection_request.requester_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only create requests for yourself.")
    if connection_request.requester_id == connection_request.requested_id:
        raise HTTPException(status_code=400, detail="You cannot request a connection with yourself.")
    
    connection_request.status = "pending"
    session.add(connection_request)
    session.commit()
    session.refresh(connection_request)
    
    # send email
    return connection_request



@router.delete("/{connection_id}")
async def delete_connection_request(
    connection_id: int,
    session: SessionDep,
    current_user: CurrentUser
) -> Any:
    connection_request = session.get(ConnectionRequests, connection_id)
    if not connection_request:
        raise HTTPException(status_code=404, detail="Connection request not found.")
    if connection_request.requester_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only delete requests you created.")
    
    session.delete(connection_request)
    session.commit()
    return {"detail": "Connection request deleted successfully."}