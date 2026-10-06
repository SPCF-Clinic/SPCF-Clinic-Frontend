import Timer from "@/components/timer/Timer";
import { useStudentDetail } from "@/hooks/students/useStudentDetail";
import { getStudentFullName } from "@/utils/students/studentName";

export default function StudentBedTimer() {
  const { data } = useStudentDetail();

  const student = data?.data;

  const bed = student?.check_in?.bed;

  if (!student || !bed) return null;

  return (
    <Timer
      occupantName={getStudentFullName(student.personal_info)}
      bedNumber={bed.bed_number}
      startedAt={bed.timer_started_at}
      expiresAt={bed.timer_expires_at}
      pausedAt={bed.timer_paused_at}
    />
  );
}