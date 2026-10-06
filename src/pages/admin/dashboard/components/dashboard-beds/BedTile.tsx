import { Box, type BoxProps } from "@mantine/core";

import StatusModal from "@/pages/admin/modals/StatusModal";
import type { BedIndex, EmptyBed } from "@/types/beds";

import Bed from "./Bed";

interface BedTileProps extends BoxProps {
  bed: BedIndex;
  openAssignBed: (bed: EmptyBed) => void;
}

export default function BedTile({
  bed,
  openAssignBed,
  ...boxProps
}: BedTileProps) {
  return (
    <Box
      onClick={() => {
        if (bed.status === "Empty") {
          openAssignBed(bed);
          return;
        }
        StatusModal.ActiveTimer(bed);
      }}
      style={{ cursor: "pointer" }}
      {...boxProps}
    >
      <Bed {...bed} />
    </Box>
  );
}
