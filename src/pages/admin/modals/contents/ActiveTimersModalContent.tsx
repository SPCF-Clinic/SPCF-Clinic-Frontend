import { modals } from "@mantine/modals";
import { useState } from "react";
import { toast } from "@/components/toast";
import { useUpdateCheckIn } from "@/hooks/check-ins/useUpdateCheckIn";
import { useUnassignBed } from "@/hooks/check-ins/useUnassignBed";
import { usePauseBedTimer } from "@/hooks/check-ins/usePauseBedTimer";
import { useResumeBedTimer } from "@/hooks/check-ins/useResumeBedTimer";
import { dayjs } from "@/services/dayjs";

import ActiveTimersModalForm, {
  type ActiveTimerPendingAction,
} from "@/pages/admin/modals/forms/ActiveTimersModalForm";
import MedicineModal from "@/pages/admin/modals/MedicineModal";
import { DashboardAsideProvider } from "@/providers/DashboardAsideProvider";

import type { BedTimerControls } from "@/types/beds";

export default function ActiveTimerModalContent({
  studentdata,
}: {
  studentdata: BedTimerControls;
}) {
  const checkInId = studentdata.check_in_id ?? studentdata.id;

  if (checkInId === undefined) return null;

  return (
    <ActiveTimerControls studentdata={studentdata} checkInId={checkInId} />
  );
}

function ActiveTimerControls({
  studentdata,
  checkInId,
}: {
  studentdata: BedTimerControls;
  checkInId: number;
}) {
  const { mutate: updateCheckIn, isPending: isUpdatingCheckIn } =
    useUpdateCheckIn(checkInId);
  const { mutate: unassignBed, isPending: isUnassigning } =
    useUnassignBed(checkInId);
  const { mutate: pauseTimer, isPending: isPausing } =
    usePauseBedTimer(checkInId);
  const { mutate: resumeTimer, isPending: isResuming } =
    useResumeBedTimer(checkInId);

  const isPaused = studentdata.timer_paused_at !== null;

  const [optimisticPausedAt, setOptimisticPausedAt] = useState<string | null>(
    null,
  );

  const [isResumeRequested, setIsResumeRequested] = useState(false);

  const pendingAction: ActiveTimerPendingAction | null = isUpdatingCheckIn
    ? "adjustTime"
    : isUnassigning
      ? "unassign"
      : isPausing
        ? "pauseTimer"
        : isResuming || isResumeRequested
          ? "resumeTimer"
          : null;

  const handleChangeMinutes = (newExpiresAt: string) => {
    updateCheckIn(
      { timer_expires_at: newExpiresAt },
      {
        onSuccess: () => {
          toast.success({ message: "Timer updated." });
          modals.closeAll();
        },
      },
    );
  };

  const handleTogglePause = () => {
    // Pause and resume take no variables: the Check-in is bound into the hook.
    if (isPaused) {
      setIsResumeRequested(true);

      resumeTimer(undefined, {
        onSuccess: () => {
          toast.success({ message: "Timer resumed." });
          modals.closeAll();
        },
        onError: () => {
          setIsResumeRequested(false);
        },
      });
    } else {
      setOptimisticPausedAt(dayjs().format("YYYY-MM-DD HH:mm:ss"));

      pauseTimer(undefined, {
        onSuccess: () => {
          toast.success({ message: "Timer paused." });
          modals.closeAll();
        },
        onError: () => {
          setOptimisticPausedAt(null);
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
        toast.success({ message: "Unassigned from bed." });
        modals.closeAll();
      },
    });
  };

  return (
    <DashboardAsideProvider active={true}>
      <ActiveTimersModalForm
        startedAt={studentdata.timer_started_at}
        effectiveStartedAt={studentdata.effective_started_at}
        expiresAt={studentdata.timer_expires_at}
        pausedAt={studentdata.timer_paused_at ?? optimisticPausedAt}
        occupantName={studentdata.current_occupant.occupant_name}
        reasonForVisit={studentdata.current_occupant.reason_for_visit}
        onAddMinutes={handleChangeMinutes}
        onSubtractMinutes={handleChangeMinutes}
        onTogglePause={handleTogglePause}
        onGiveMedicine={handleGiveMedicine}
        onUnassign={handleUnassign}
        pendingAction={pendingAction}
      />
    </DashboardAsideProvider>
  );
}
