from typing import Any, TypedDict


class EvaluationState(TypedDict, total=False):
    project_id: str
    prompts: list[str]
    dataset_path: str | None
    model_name: str | None

    prompt_security_result: dict[str, Any]
    dataset_validation_result: dict[str, Any]
    model_evaluation_result: dict[str, Any]
    risk_score: float | None
    report: str | None
    error: str | None
