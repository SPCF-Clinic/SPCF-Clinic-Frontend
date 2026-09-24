import { modals } from "@mantine/modals";
import { useUpdateCheckIn } from "@/hooks/check-ins/useUpdateCheckIn";
import { useUnassignBed } from "@/hooks/check-ins/useUnassignBed";
import { usePauseBedTimer } from "@/hooks/check-ins/usePauseBedTimer";
import { useResumeBedTimer } from "@/hooks/check-ins/useResumeBedTimer";

import ActiveTimersModalForm from "@/pages/admin/modals/forms/ActiveTimersModalForm";
import MedicineModal from "@/pages/admin/modals/MedicineModal";
import { DashboardAsideProvider } from "@/providers/DashboardAsideProvider";

export default function ActiveTimerModalContent({ studentdata }: { studentdata: any }) {

  const checkInId = studentdata.check_in_id || studentdata.id;
 

  const { mutate: updateCheckIn } = useUpdateCheckIn(checkInId);
  const { mutate: unassignBed } = useUnassignBed(checkInId);
  const { mutate: pauseTimer } = usePauseBedTimer(checkInId);
  const { mutate: resumeTimer } = useResumeBedTimer(checkInId);

  const isPaused = studentdata.timer_paused_at !== null;

  const handleAddMinutes = (newExpiresAt: string) => {
    updateCheckIn({ timer_expires_at: newExpiresAt });
  };

  const handleSubtractMinutes = (newExpiresAt: string) => {
    updateCheckIn({ timer_expires_at: newExpiresAt });
  };

  const handleTogglePause = () => {
    if (isPaused) {
    resumeTimer(checkInId, {
      onSuccess: () => {
        modals.closeAll();
      },
    });
  } else {
    pauseTimer(checkInId, {
      onSuccess: () => {
        modals.closeAll();
      },
    });
  }
  };

  const handleGiveMedicine = () => {
    MedicineModal.Give(studentdata, "Medicine" as any);
  };

  const handleUnassign = () => {
    unassignBed(undefined, {
      onSuccess: () => {
        modals.closeAll();
      },
    });
  };

  return (
    <DashboardAsideProvider active={true}>
      <ActiveTimersModalForm
        startedAt={studentdata.timer_started_at}
        expiresAt={studentdata.timer_expires_at}
        pausedAt={studentdata.timer_paused_at}
        patientName={studentdata.current_occupant?.occupant_name}
        condition={studentdata.current_occupant?.reason_for_visit}
        onAddMinutes={handleAddMinutes}
        onSubtractMinutes={handleSubtractMinutes}
        onTogglePause={handleTogglePause}
        onGiveMedicine={handleGiveMedicine}
        onUnassign={handleUnassign}
      />
    </DashboardAsideProvider>
  );
}