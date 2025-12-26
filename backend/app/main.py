from fastapi import FastAPI
from .routes import router

app = FastAPI(title="Focus Tracker API (FastAPI)")

app.include_router(router)
