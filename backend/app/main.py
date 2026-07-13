from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse

from app.api.v1 import router as v1_router
from app.config import get_settings
from app.core.exceptions import AppError
from app.core.logging import setup_logging
from app.middleware.error_handler import app_exception_handler, unhandled_exception_handler

settings = get_settings()


@asynccontextmanager
async def lifespan(_app: FastAPI):
    setup_logging("DEBUG" if settings.app_debug else "INFO")
    yield


app = FastAPI(
    title="Sentinel AI",
    description="AI Governance Platform",
    version="0.1.0",
    lifespan=lifespan,
    default_response_class=ORJSONResponse,
    docs_url="/docs" if settings.is_development else None,
    redoc_url="/redoc" if settings.is_development else None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(AppError, app_exception_handler)
app.add_exception_handler(Exception, unhandled_exception_handler)

app.include_router(v1_router, prefix="/api")
