import Timer from "@/components/timer/Timer";
import { useStudentDetail } from "@/hooks/students/useStudentDetail";
import StatusModal from "@/pages/admin/modals/StatusModal";
import { getStudentFullName } from "@/utils/students/studentName";

export default function StudentBedTimer() {
  const { data } = useStudentDetail();

  const student = data?.data;

  const bed = student?.check_in?.bed;

  if (!student || !bed) return null;

  const occupantName = getStudentFullName(student.personal_info);

  // The controls dialog is opened from two places, the dashboard's Bed Timers
  // and here, and reads one named shape either way. The Bed Assignment supplies
  // the three timestamps and the Bed number; the Check-in supplies the
  // identifier the controls act on, and it is absent for a student who has
  // never been checked in.
  const openControls = () => {
    StatusModal.ActiveTimer({
      check_in_id: student.check_in?.id ?? null,
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
