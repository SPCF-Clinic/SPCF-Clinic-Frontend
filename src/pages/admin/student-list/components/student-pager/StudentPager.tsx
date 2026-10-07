import { Group, Pagination } from "@mantine/core";

interface StudentPagerProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function StudentPager({
  page,
  totalPages,
  onPageChange,
}: StudentPagerProps) {
  return (
    <Group justify="center" className="no-print">
      <Pagination value={page} total={totalPages} onChange={onPageChange} />
    </Group>
  );
}
