import { useQuery } from "@tanstack/react-query";

import { getEvaluations } from "@/services/evaluations";

export function useEvaluations() {
  return useQuery({ queryKey: ["evaluations"], queryFn: getEvaluations });
}
