import { Table, type TableProps, type TableThProps } from "@mantine/core";
import type { ReactNode } from "react";

export interface ColumnDef extends Omit<TableThProps, "title"> {
  key?: string;
  title: ReactNode;
}

interface AppTableProps extends TableProps {
  columns: ColumnDef[];
  children: ReactNode;
}

export function AppTable({ columns, children, ...rest }: AppTableProps) {
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
      <Table.Tbody>{children}</Table.Tbody>
    </Table>
  );
}
