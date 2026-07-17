import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEvaluations } from "@/hooks/use-evaluations";
import type { EvaluationStatus } from "@/types/api";

const STATUS_VARIANT: Record<EvaluationStatus, "default" | "secondary" | "destructive" | "success" | "warning"> = {
  pending: "secondary",
  running: "warning",
  completed: "success",
  failed: "destructive",
};

function riskColor(score: number | null) {
  if (score == null) return "text-muted-foreground";
  if (score < 0.3) return "text-success";
  if (score < 0.6) return "text-warning";
  return "text-destructive";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function EvaluationsPage() {
  const { data: evaluations = [], isLoading } = useEvaluations();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Evaluations</h1>
        <p className="text-sm text-muted-foreground">Governance evaluation results and risk scores</p>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="p-6 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ) : evaluations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-sm text-muted-foreground">No evaluations yet</p>
            <p className="text-xs text-muted-foreground mt-1">Evaluations appear here when a project is submitted for review</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead className="hidden md:table-cell">Summary</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {evaluations.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium font-mono text-xs">
                    {e.model_name ?? "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[e.status]}>{e.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-mono text-sm font-medium ${riskColor(e.risk_score)}`}>
                      {e.risk_score != null ? e.risk_score.toFixed(2) : "—"}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground max-w-xs truncate">
                    {e.summary ?? "—"}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {formatDate(e.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
