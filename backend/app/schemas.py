from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CategoryBase(BaseModel):
    name: str
    color: Optional[str] = None


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    color: Optional[str] = None


class CategoryResponse(BaseModel):
    id: int
    name: str
    color: str | None
    flag_aktif: bool
    created_at: datetime

    class Config:
        from_attributes = True

class FocusSessionBase(BaseModel):
    title: str
    category_id: int
    start_time: datetime
    end_time: Optional[datetime] = None
    duration_minutes: Optional[int] = None


class FocusSessionCreate(FocusSessionBase):
    pass


class FocusSessionResponse(BaseModel):
    id: int
    title: str
    start_time: datetime
    end_time: Optional[datetime]
    duration_minutes: Optional[int]
    created_at: datetime

    category: CategoryResponse 

    class Config:
        from_attributes = True
