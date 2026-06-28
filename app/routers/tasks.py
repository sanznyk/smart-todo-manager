from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


# Create Task
@router.post("/", response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db, task)


# Get All Tasks
@router.get("/", response_model=list[schemas.TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    return crud.get_tasks(db)


# Get Task By ID
@router.get("/{task_id}", response_model=schemas.TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.get_task(db, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task


# Update Task
@router.put("/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int,
                task: schemas.TaskUpdate,
                db: Session = Depends(get_db)):

    updated_task = crud.update_task(db, task_id, task)

    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")

    return updated_task


# Toggle Completion
@router.patch("/{task_id}/toggle", response_model=schemas.TaskResponse)
def toggle_task(task_id: int, db: Session = Depends(get_db)):

    task = crud.toggle_task(db, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task


# Delete Task
@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):

    task = crud.delete_task(db, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return {"message": "Task deleted successfully"}