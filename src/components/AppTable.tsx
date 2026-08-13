import {
  EmptyState,
  Skeleton,
  Table,
  useMantineTheme,
  type SkeletonProps,
  type TableProps,
  type TableThProps,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconZoom } from "@tabler/icons-react";
import type { ReactNode } from "react";

export interface ColumnDef extends Omit<TableThProps, "title"> {
  key?: string;
  title: ReactNode;
  skeletonProps?: SkeletonProps;
}

interface AppTableProps<T> extends Omit<TableProps, "data"> {
  columns: ColumnDef[];
  data?: T[];
  isPending?: boolean;
  skeletonRows?: number;
  children: ReactNode;
}

export function AppTable<T>({
  columns,
  data,
  isPending,
  skeletonRows = 5,
  children,
  ...rest
}: AppTableProps<T>) {
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
      {...rest}
    >
      <Table.Thead>
        <Table.Tr>
          {columns.map(({ title, key, w, ...rest }, i) => {
            const headerKey = key ?? (typeof title === "string" ? title : i);

            return (
              <Table.Th
                key={headerKey}
                c="primary"
                bg="gray.2"
                {...rest}
                w={isAboveBreakpoint ? w : undefined}
              >
                {title}
              </Table.Th>
            );
          })}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {isPending ? (
          Array.from({ length: skeletonRows }).map((_, rowIndex) => (
            <Table.Tr key={rowIndex}>
              {columns.map(({ skeletonProps }, columnIndex) => (
                <Table.Td key={columnIndex}>
                  <Skeleton height={21} radius="md" {...skeletonProps} />
                </Table.Td>
              ))}
            </Table.Tr>
          ))
        ) : isEmpty ? (
          // Empty component here
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
