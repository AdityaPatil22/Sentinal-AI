from fastapi import APIRouter
from sqlalchemy import text

from app.core.response import success
from app.db.session import async_session

router = APIRouter(tags=["health"])


@router.get("/health")
async def health_check():
    return success(data={"status": "healthy"}, message="Service is running")


@router.get("/health/db")
async def db_health_check():
    async with async_session() as session:
        await session.execute(text("SELECT 1"))
    return success(data={"database": "connected"})
