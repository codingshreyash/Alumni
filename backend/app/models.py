# example from template

import uuid

from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel
from datetime import datetime, timezone
from typing import List, Optional

# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    full_name: Optional[str] = Field(default=None, max_length=255)

# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)

class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: Optional[str] = Field(default=None, max_length=255)

# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: Optional[EmailStr] = Field(default=None, max_length=255)  # type: ignore
    password: Optional[str] = Field(default=None, min_length=8, max_length=40)
    graduation_year: Optional[int] = None
    linkedin_url: Optional[str] = None
    personal_website: Optional[str] = None
    current_company: Optional[str] = None
    current_role: Optional[str] = None
    profile_image: Optional[str] = None
    open_to_coffee_chats: bool = False
    open_to_mentorship: bool = False
    available_for_referrals: bool = False
    bio: Optional[str] = None
    is_alumni: Optional[bool] = False
    is_admin: Optional[bool] = False
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# TODO: Add more fields when updating profile
class UserUpdateMe(SQLModel):
    full_name: Optional[str] = Field(default=None, max_length=255)
    email: Optional[EmailStr] = Field(default=None, max_length=255)
    graduation_year: Optional[int] = None
    linkedin_url: Optional[str] = None
    personal_website: Optional[str] = None
    current_company: Optional[str] = None
    current_role: Optional[str] = None
    profile_image: Optional[str] = None
    open_to_coffee_chats: bool = False
    open_to_mentorship: bool = False
    available_for_referrals: bool = False
    bio: Optional[str] = None
    is_alumni: Optional[bool] = False
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True) # auto increments because sqlalchemy is dumb
    hashed_password: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    location: Optional[str] = None
    graduation_year: Optional[int] = None
    linkedin_url: Optional[str] = None
    personal_website: Optional[str] = None
    current_company: Optional[str] = None
    current_role: Optional[str] = None
    profile_image: Optional[str] = None
    open_to_coffee_chats: bool = False
    open_to_mentorship: bool = False
    available_for_referrals: bool = False
    bio: Optional[str] = None
    is_alumni: bool = False
    is_admin: bool = False
    profile_completed: bool = False
    profile_visible: bool = False

# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: int | None = Field(default=None, primary_key=True)

class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int

class EmailBase(SQLModel):
    email: EmailStr = Field(primary_key=True)
    preferred: bool = False

class Email(EmailBase, table=True):
    user_id: int = Field(foreign_key="user.id", nullable=False)

class EmailsPublic(SQLModel):
    data: List[EmailBase]
    count: int

# # Shared properties
# class ItemBase(SQLModel):
#     title: str = Field(min_length=1, max_length=255)
#     description: str | None = Field(default=None, max_length=255)


# # Properties to receive on item creation
# class ItemCreate(ItemBase):
#     pass


# # Properties to receive on item update
# class ItemUpdate(ItemBase):
#     title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore


# # Database model, database table inferred from class name
# class Item(ItemBase, table=True):
#     id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
#     title: str = Field(max_length=255)
#     owner_id: uuid.UUID = Field(
#         foreign_key="user.id", nullable=False, ondelete="CASCADE"
#     )
#     owner: User | None = Relationship(back_populates="items")


# # Properties to return via API, id is always required
# class ItemPublic(ItemBase):
#     id: uuid.UUID
#     owner_id: uuid.UUID


# class ItemsPublic(SQLModel):
#     data: list[ItemPublic]
#     count: int


# # Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: str | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=40)