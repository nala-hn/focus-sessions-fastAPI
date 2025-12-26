from pydantic import BaseModel
from datetime import datetime
from typing import Optional


# =====================
# CATEGORY SCHEMAS
# =====================

class CategoryBase(BaseModel):
    name: str
    color: Optional[str] = None


class CategoryCreate(CategoryBase):
    pass


class CategoryResponse(CategoryBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# =====================
# FOCUS SESSION SCHEMAS
# =====================

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

    category: CategoryResponse  # WAJIB ADA

    class Config:
        from_attributes = True
