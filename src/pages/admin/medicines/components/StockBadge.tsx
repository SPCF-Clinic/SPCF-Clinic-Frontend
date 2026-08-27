import { Badge, type BadgeProps } from "@mantine/core";
import type { StockStatus } from "@/types/items";

const STOCK_STATUS_COLORS: Record<
	StockStatus,
	Pick<BadgeProps, "bg" | "color">
> = {
	"Out of Stock": { bg: "red.2", color: "red.8" },
	"Low Stock": { bg: "yellow.1", color: "yellow.8" },
	"In Stock": { bg: "green.1", color: "green.8" },
};

export default function StockBadge({ status }: { status: StockStatus }) {
	return (
		<Badge
			size="xl"
			variant="outline"
			fw={400}
			fz="sm"
			tt="none"
			{...STOCK_STATUS_COLORS[status]}
		>
			{status}
		</Badge>
	);
}
