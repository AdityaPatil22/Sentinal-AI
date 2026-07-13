from typing import Any

from pydantic import BaseModel


class SuccessResponse(BaseModel):
    success: bool = True
    message: str = ""
    data: Any = None


class ErrorResponse(BaseModel):
    success: bool = False
    message: str = ""
    errors: list[Any] = []


def success(data: Any = None, message: str = "") -> dict[str, Any]:
    return {"success": True, "message": message, "data": data}


def error(message: str = "", errors: list[Any] | None = None) -> dict[str, Any]:
    return {"success": False, "message": message, "errors": errors or []}
