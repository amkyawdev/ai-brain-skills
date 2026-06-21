# Background Tasks

## Using BackgroundTasks

```python
from fastapi import BackgroundTasks

def send_email(email: str, message: str):
    # Email sending logic
    print(f"Sending email to {email}: {message}")

@app.post("/send-notification/")
async def send_notification(email: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(send_email, email, "Notification message")
    return {"message": "Notification queued"}
```

## Task Dependencies

```python
from fastapi import Depends

def get_db():
    db = SessionLocal()
    yield db

@app.post("/process/")
async def process_data(
    data: str,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    def process(db: Session):
        # Process with db dependency
        pass
    
    background_tasks.add_task(process, db)
    return {"message": "Processing started"}
```

## Celery Integration

```python
# tasks.py
from celery import Celery

celery_app = Celery("tasks", broker="redis://localhost")

@celery_app.task
def send_email_task(email: str):
    # Email sending logic
    pass

# FastAPI endpoint
@app.post("/send-email/")
async def send_email(email: str):
    send_email_task.delay(email)
    return {"message": "Task queued"}
```
