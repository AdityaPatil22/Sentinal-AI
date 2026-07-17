import api from "./api";
import type { ApiResponse, Report } from "@/types/api";

export async function getReports() {
  const { data } = await api.get<ApiResponse<Report[]>>("/reports");
  return data.data;
}
