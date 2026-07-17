import api from "./api";
import type { ApiResponse, Project, CreateProjectRequest } from "@/types/api";

export async function getProjects() {
  const { data } = await api.get<ApiResponse<Project[]>>("/projects");
  return data.data;
}

export async function createProject(body: CreateProjectRequest) {
  const { data } = await api.post<ApiResponse<Project>>("/projects", body);
  return data.data;
}
