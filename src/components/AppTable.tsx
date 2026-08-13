import {
  Skeleton,
  Table,
  type SkeletonProps,
  type TableProps,
  type TableThProps,
} from "@mantine/core";
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

  return (
    <Table layout="fixed" verticalSpacing="sm" horizontalSpacing="sm" {...rest}>
      <Table.Thead>
        <Table.Tr>
          {columns.map(({ title, key, ...rest }, i) => {
            const headerKey = key ?? (typeof title === "string" ? title : i);

            return (
              <Table.Th key={headerKey} c="primary" bg="gray.2" {...rest}>
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
          <Table.Tr>
            <Table.Td colSpan={columns.length} p="xl">
              No records found
            </Table.Td>
          </Table.Tr>
        ) : (
          children
        )}
      </Table.Tbody>
    </Table>
  );
}
