from sqlalchemy.orm import Session
from app import models, schemas


# Create Task
def create_task(db: Session, task: schemas.TaskCreate):
    new_task = models.Task(
        title=task.title,
        description=task.description,
        completed=False
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


# Get All Tasks
def get_tasks(db: Session):
    return db.query(models.Task).all()


# Get Task By ID
def get_task(db: Session, task_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id).first()


# Update Task
def update_task(db: Session, task_id: int, task: schemas.TaskUpdate):

    db_task = get_task(db, task_id)

    if not db_task:
        return None

    db_task.title = task.title
    db_task.description = task.description
    db_task.completed = task.completed

    db.commit()
    db.refresh(db_task)

    return db_task


# Toggle Completion
def toggle_task(db: Session, task_id: int):

    db_task = get_task(db, task_id)

    if not db_task:
        return None

    db_task.completed = not db_task.completed

    db.commit()
    db.refresh(db_task)

    return db_task


# Delete Task
def delete_task(db: Session, task_id: int):

    db_task = get_task(db, task_id)

    if not db_task:
        return None

    db.delete(db_task)
    db.commit()

    return db_task