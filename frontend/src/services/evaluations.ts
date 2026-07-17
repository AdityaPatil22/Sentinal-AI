import api from "./api";
import type { ApiResponse, Evaluation } from "@/types/api";

export async function getEvaluations() {
  const { data } = await api.get<ApiResponse<Evaluation[]>>("/evaluations");
  return data.data;
}
