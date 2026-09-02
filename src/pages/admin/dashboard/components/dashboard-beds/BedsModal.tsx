import { Box, Grid, type ModalProps } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import { AppModal } from "@/components/AppModal";
import QueryError from "@/components/QueryError";
import { bedQueries } from "@/query/beds";
import Bed from "./Bed";
import BedSkeleton from "./BedSkeleton";
import ColorSwatchLegend from "./ColorSwatchLegend";

export default function BedsModal(props: ModalProps) {
	const { opened } = props;
	const {
		data,
		isPending,
		error,
		refetch,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useInfiniteQuery({
		...bedQueries.list(),
		enabled: opened,
	});

	const [container, setContainer] = useState<HTMLDivElement | null>(null);
	const { ref, entry } = useIntersection({
		root: container,
		rootMargin: "200px",
	});

	useEffect(() => {
		if (opened && entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [
		opened,
		entry?.isIntersecting,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	]);

	if (error) {
		return <QueryError error={error} onRetry={refetch} />;
	}

	return (
		<AppModal
			size="xl"
			title="Bed Status"
			footer={
				<Box
					py="sm"
					px="md"
					bg="var(--mantine-color-body)"
					style={{
						position: "sticky",
						bottom: 0,
						zIndex: 10,
						borderTop: "1px solid var(--mantine-color-default-border)",
					}}
				>
					<ColorSwatchLegend />
				</Box>
			}
			contentProps={{ h: "60dvh", ref: setContainer }}
			bodyProps={{ py: "md" }}
			{...props}
		>
			<Grid columns={5} justify="space-between" gap="md">
				{isPending
					? Array.from({ length: 20 }, (_, i) => (
							<Grid.Col span={{ base: 3, xs: 2, sm: 1 }} key={i}>
								<BedSkeleton />
							</Grid.Col>
						))
					: data.pages.map(({ data }, i) => (
							<React.Fragment key={data.next_cursor ?? i}>
								{data.data.map((bed) => (
									<Grid.Col span={{ base: 3, xs: 2, sm: 1 }} key={bed.id}>
										<Bed {...bed} />
									</Grid.Col>
								))}
							</React.Fragment>
						))}

				{(hasNextPage || isFetchingNextPage) &&
					Array.from({ length: 10 }, (_, i) => (
						<Grid.Col
							span={{ base: 3, xs: 2, sm: 1 }}
							key={`skeleton-next-${i}`}
						>
							<BedSkeleton />
						</Grid.Col>
					))}
			</Grid>

			{hasNextPage && !isFetchingNextPage && <Box ref={ref} />}
		</AppModal>
	);
}
