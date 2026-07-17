import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getProjects, createProject } from "@/services/projects";
import type { CreateProjectRequest } from "@/types/api";

export function useProjects() {
  return useQuery({ queryKey: ["projects"], queryFn: getProjects });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateProjectRequest) => createProject(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}
