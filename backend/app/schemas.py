from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

class CategoryResponse(BaseModel):
    id: int
    name: str
    color: str | None = None

    model_config = ConfigDict(from_attributes=True)

class FocusSessionCreate(BaseModel):
    title: str
    category_id: int
    start_time: datetime
    end_time: datetime | None = None


class FocusSessionResponse(BaseModel):
    id: int
    title: str
    start_time: datetime
    end_time: datetime | None
    duration_minutes: int | None
    category: CategoryResponse

    model_config = ConfigDict(from_attributes=True)
