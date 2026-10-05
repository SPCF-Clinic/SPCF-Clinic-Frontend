import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import type { EmptyBed } from "@/types/beds";
import type { AssignBedModalProps } from "./AssignBedModal";

/**
 * Owns the state for the assign bed modal so every bed grid can share it
 * without duplicating the disclosure + selection pair.
 */
export function useAssignBedModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [bed, setBed] = useState<EmptyBed | null>(null);

  const openAssignBed = (target: EmptyBed) => {
    setBed(target);
    open();
  };

  const assignBedModalProps: AssignBedModalProps = {
    opened,
    onClose: close,
    onExitTransitionEnd: () => setBed(null),
    bedId: bed?.id ?? null,
    bedNumber: bed?.bed_number ?? "",
  };

  return {
    openAssignBed,
    assignBedModalProps,
  };
}
