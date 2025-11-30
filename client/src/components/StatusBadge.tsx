import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@shared/schema";

interface StatusBadgeProps {
  status: string;
  size?: "sm" | "default";
}

export function StatusBadge({ status, size = "default" }: StatusBadgeProps) {
  const label = ORDER_STATUS_LABELS[status] || status;
  const colorClass = ORDER_STATUS_COLORS[status] || "bg-gray-100 text-gray-800";

  return (
    <Badge
      variant="outline"
      className={`${colorClass} border-transparent font-medium ${
        size === "sm" ? "text-xs px-2 py-0.5" : ""
      }`}
      data-testid={`status-badge-${status}`}
    >
      {label}
    </Badge>
  );
}
