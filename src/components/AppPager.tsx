import { Group, Pagination } from "@mantine/core";

interface AppPagerProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function AppPager({
  page,
  totalPages,
  onPageChange,
}: AppPagerProps) {
  return (
    <Group justify="center" className="no-print">
      <Pagination value={page} total={totalPages} onChange={onPageChange} />
    </Group>
  );
}
