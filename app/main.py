from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

print("STEP 1")

from app.routers import tasks

print("STEP 2")
print("Router routes:")
print(tasks.router.routes)

app = FastAPI(
    title="To-Do List API",
    version="1.0.0"
)

print("STEP 3")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)

print("STEP 4")
print("App routes:")
print(app.routes)


@app.get("/")
def home():
    return {
        "message": "Hello"
    }