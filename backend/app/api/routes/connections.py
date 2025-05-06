from fastapi import APIRouter, HTTPException
from pydantic import ValidationError
from typing import Any
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import ConnectionRequest, ConnectionRequestPublic
from datetime import datetime, timezone

router = APIRouter(prefix="/connections", tags=["connections"])

@router.post("/", response_model=ConnectionRequest)
async def create_connection_request(
    request_create: ConnectionRequestPublic,
    session: SessionDep,
    current_user: CurrentUser
) -> Any:
    if request_create.requester_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only create requests for yourself.")
    if request_create.requester_id == request_create.requested_id:
        raise HTTPException(status_code=400, detail="You cannot request a connection with yourself.")
    
    # check if the reverse request already exists
    # TODO: change behavior to accept request instead
    statement = select(ConnectionRequest).where(
        ConnectionRequest.requester_id == request_create.requested_id,
        ConnectionRequest.requested_id == request_create.requester_id)
    session_user = session.exec(statement).first()
    if session_user:
        raise HTTPException(
            status_code=400,
            detail="The user has already requested you",
        )
    
    conn = ConnectionRequest.model_validate(request_create)
    session.add(conn)
    session.commit()
    session.refresh(conn)
    
    # send email
    return conn



@router.delete("/{connection_id}")
async def delete_connection_request(
    connection_id: int,
    session: SessionDep,
    current_user: CurrentUser
) -> Any:
    connection_request = session.get(ConnectionRequest, connection_id)
    if not connection_request:
        raise HTTPException(status_code=404, detail="Connection request not found.")
    if connection_request.requester_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only delete requests you created.")
    
    session.delete(connection_request)
    session.commit()
    return {"detail": "Connection request deleted successfully."}