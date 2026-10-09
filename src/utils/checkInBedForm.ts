import { dayjs } from "@/services/dayjs";
import type { BedIndex } from "@/types/beds";

/**
 * Time limits offered when assigning a bed, in 5 minute steps up to an hour.
 * The values are minutes from now, matching what `formatBedTimer` consumes.
 */
export const BED_TIME_LIMIT_OPTIONS = Array.from({ length: 12 }, (_, index) => {
  const minutes = (index + 1) * 5;

  return {
    value: String(minutes),
    label: `${minutes} minutes`,
  };
});

/** Beds an admin can pick: everything that is not currently occupied. */
export function getAssignableBedOptions(beds: BedIndex[] | undefined) {
  return (beds ?? [])
    .filter((bed) => bed.status !== "Occupied")
    .map((bed) => ({ value: String(bed.id), label: bed.bed_number }));
}

/**
 * A bed is only useful with a timer, and `UpdateCheckInRequest` rejects
 * `bed_id` without `timer_expires_at`, so both are required as a pair.
 */
export const validateBedId = (value: string | null | undefined) =>
  value ? null : "Please select a bed";

export const validateBedTimer = (value: string | null | undefined) =>
  value ? null : "Please select a time limit";

export function formatBedTimer(minutes: string | number): string {
  return dayjs().add(Number(minutes), "minute").format("YYYY-MM-DD HH:mm:ss");
}
