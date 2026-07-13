from fastapi import APIRouter, Depends

from app.auth.dependencies import get_current_user
from app.core.response import success
from app.models.user import User

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("")
async def list_projects(_current_user: User = Depends(get_current_user)):
    return success(data=[], message="Projects retrieved")
