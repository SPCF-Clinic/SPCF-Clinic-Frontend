import { Breadcrumbs as BaseBreadcrumbs, Anchor, Text } from "@mantine/core";
import { Link } from "react-router-dom";

import { useStudentDetail } from "@/hooks/students/useStudentDetail";
import { getStudentFullName } from "@/utils/students/studentName";

export default function Breadcrumbs() {
  const { data } = useStudentDetail();

  const fullName = data ? getStudentFullName(data.data.personal_info) : "";

  return (
    <BaseBreadcrumbs separator=">">
      <Anchor component={Link} to="/admin/students">
        List of Students
      </Anchor>
      <Text fw={300} c="dimmed">
        {fullName}
      </Text>
    </BaseBreadcrumbs>
  );
}
