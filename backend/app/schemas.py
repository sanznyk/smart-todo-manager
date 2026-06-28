from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# Schema for creating a task
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None


# Schema for updating a task
class TaskUpdate(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool


# Schema for returning task data
class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    completed: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True