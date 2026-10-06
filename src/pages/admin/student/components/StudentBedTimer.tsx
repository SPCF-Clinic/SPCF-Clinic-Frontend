import Timer from "@/components/timer/Timer";
import { useStudentDetail } from "@/hooks/students/useStudentDetail";
import StatusModal from "@/pages/admin/modals/StatusModal";
import { getStudentFullName } from "@/utils/students/studentName";

export default function StudentBedTimer() {
  const { data } = useStudentDetail();

  const student = data?.data;

  // Tests the chain directly, so TypeScript narrows `student.check_in` below.
  if (!student?.check_in?.bed) return null;

  const bed = student.check_in.bed;
  const checkInId = student.check_in.id;
  const occupantName = getStudentFullName(student.personal_info);

  const openControls = () => {
    StatusModal.ActiveTimer({
      check_in_id: checkInId,
      bed_number: bed.bed_number,
      timer_started_at: bed.timer_started_at,
      timer_expires_at: bed.timer_expires_at,
      timer_paused_at: bed.timer_paused_at,
      current_occupant: {
        user_id: student.id,
        occupant_name: occupantName,
      },
    });
  };

  return (
    <Timer
      occupantName={occupantName}
      bedNumber={bed.bed_number}
      startedAt={bed.timer_started_at}
      expiresAt={bed.timer_expires_at}
      pausedAt={bed.timer_paused_at}
      onClick={openControls}
    />
  );
}
