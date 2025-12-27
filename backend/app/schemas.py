from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List, TypeVar, Generic

T = TypeVar('T')

class CategoryBase(BaseModel):
    name: str
    color: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    color: Optional[str] = None
    flag_aktif: Optional[bool] = None

class CategoryResponse(BaseModel):
    id: int
    name: str
    color: Optional[str] = None
    flag_aktif: bool
    created_at: datetime

    class Config:
        from_attributes = True

class FocusSessionCreate(BaseModel):
    title: str
    category_id: int

class FocusSessionResponse(BaseModel):
    id: int
    title: str
    start_time: datetime
    end_time: Optional[datetime]
    duration_minutes: Optional[int]
    category: CategoryResponse

    class Config:
        from_attributes = True

class PaginatedResponse(BaseModel, Generic[T]):
    page: int
    limit: int
    total: int
    list: List[T]

class StandardResponse(BaseModel, Generic[T]):
    result: str
    detail: str
    code: int
    version: Optional[str] = None
    data: Optional[T] = None

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

