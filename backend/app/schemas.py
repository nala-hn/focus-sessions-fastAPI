from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class FocusSessionCreate(BaseModel):
    title: str
    category: str
    start_time: datetime

class FocusSessionResponse(FocusSessionCreate):
    id: int
    end_time: Optional[datetime]
    duration_minutes: Optional[int]

    class Config:
        orm_mode = True
