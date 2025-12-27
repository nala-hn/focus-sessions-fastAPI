from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from .routes import router as api_router
from .auth import router as auth_router
from .database import engine
from . import models
from .schemas import StandardResponse

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Focus Tracker API (FastAPI)")

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content=StandardResponse(
            code=exc.status_code,
            result="Gagal",
            detail=exc.detail,
            data=None
        ).dict(),
    )

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content=StandardResponse(
            code=500,
            result="Gagal",
            detail=str(exc),
            data=None
        ).dict(),
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")
app.include_router(auth_router, prefix="/auth")
