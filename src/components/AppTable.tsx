import {
  EmptyState,
  Skeleton,
  type SkeletonProps,
  Table,
  type TableProps,
  type TableThProps,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconArrowDown,
  IconArrowUp,
  IconSelector,
  IconZoom,
} from "@tabler/icons-react";
import type { ReactNode } from "react";

export interface ColumnDef<K extends string = never> extends Omit<
  TableThProps,
  "title"
> {
  key?: string;
  title?: ReactNode;
  skeletonProps?: SkeletonProps;
  /** Declares this column sortable. Ignored unless the table is
   *  handed a `sort` prop. With K = never (no sort), this can
   *  never compile, so inert tables stay inert. */
  sortKey?: K;
}

export type SortOrder = "asc" | "desc";

export interface TableSort<K extends string = never> {
  key: K | null;
  order: SortOrder | null;
  onSortChange: (key: K, order: SortOrder) => void;
}

interface AppTableProps<T, K extends string = never> extends Omit<
  TableProps,
  "data"
> {
  columns: ColumnDef<K>[];
  data?: T[];
  isPending?: boolean;
  skeletonRows?: number;
  skeletonRowHeight?: number;
  /** The current sort and its change handler. Optional: omit it
   *  and every header renders exactly as it did before. */
  sort?: TableSort<K>;
  children: ReactNode;
}

export function AppTable<T, K extends string = never>({
  columns,
  data,
  isPending,
  skeletonRows = 5,
  children,
  style,
  skeletonRowHeight,
  sort,
  ...rest
}: AppTableProps<T, K>) {
  const isEmpty = !isPending && data?.length === 0;
  const theme = useMantineTheme();
  const isAboveBreakpoint = useMediaQuery(
    `(min-width: ${theme.breakpoints.sm})`,
  );

  return (
    <Table
      layout={isAboveBreakpoint ? "fixed" : "auto"}
      verticalSpacing="sm"
      horizontalSpacing="sm"
      style={{
        borderBottom: "1px solid var(--table-border-color)",
        ...style,
      }}
      {...rest}
    >
      <Table.Thead>
        <Table.Tr>
          {columns.map(({ title, key, w, sortKey, ...rest }, i) => {
            const headerKey = key ?? (typeof title === "string" ? title : i);
            const sortable = sort !== undefined && sortKey !== undefined;
            const isActive = sortable && sort.key === sortKey;
            const ariaSort: "ascending" | "descending" | "none" | undefined =
              !sortable
                ? undefined
                : isActive && sort.order === "desc"
                  ? "descending"
                  : isActive
                    ? "ascending"
                    : "none";

            return (
              <Table.Th
                key={headerKey}
                c="primary"
                bg="gray.2"
                aria-sort={ariaSort}
                {...rest}
                w={isAboveBreakpoint ? w : undefined}
              >
                {sortable ? (
                  <UnstyledButton
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontWeight: "inherit",
                      color: "inherit",
                    }}
                    onClick={() => {
                      // A new column sorts ascending; clicking the
                      // sorted column reverses it.
                      const nextOrder: SortOrder =
                        isActive && sort.order === "asc" ? "desc" : "asc";
                      sort.onSortChange(sortKey, nextOrder);
                    }}
                  >
                    <span>{title}</span>
                    {isActive ? (
                      sort.order === "desc" ? (
                        <IconArrowDown size={14} />
                      ) : (
                        <IconArrowUp size={14} />
                      )
                    ) : (
                      <IconSelector size={14} style={{ opacity: 0.4 }} />
                    )}
                  </UnstyledButton>
                ) : (
                  title
                )}
              </Table.Th>
            );
          })}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {isPending ? (
          Array.from({ length: skeletonRows }).map((_, rowIndex) => (
            <Table.Tr
              h={skeletonRowHeight}
              style={{ cursor: "wait" }}
              key={rowIndex}
            >
              {columns.map(({ title, id, skeletonProps }, columnIndex) => (
                <Table.Td
                  h={skeletonRowHeight}
                  key={(title as string) || id || columnIndex}
                >
                  <Skeleton height={21} radius="md" {...skeletonProps} />
                </Table.Td>
              ))}
            </Table.Tr>
          ))
        ) : isEmpty ? (
          <Table.Tr data-empty>
            <Table.Td colSpan={columns.length} p="xl">
              <EmptyState icon={<IconZoom />} title="No results found" />
            </Table.Td>
          </Table.Tr>
        ) : (
          children
        )}
      </Table.Tbody>
    </Table>
  );
}
