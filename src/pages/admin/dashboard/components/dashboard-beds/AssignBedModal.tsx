import {
  Box,
  Button,
  MaskInput,
  Stack,
  Text,
  type ModalRootProps,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

import { AppModal } from "@/components/AppModal";
import { toast } from "@/components/toast";
import { useAssignBed } from "@/hooks/check-ins/useAssignBed";
import { dayjs } from "@/services/dayjs";
import { showToastError } from "@/utils/toastError";
import CheckInSelect from "./CheckInSelect";
import { FIELD_BACKGROUND } from "./constants";

const MAX_MINUTES = 60;
const TIMER_FORMAT = /^\d{2}:\d{2}$/;
const TIMER_MASK = [/[0-6]/, /\d/, ":", /[0-5]/, /\d/];
const TIMER_MASK_LIMITED = [/[0-6]/, /[0]/, ":", /[0]/, /[0]/];

export interface AssignBedModalProps extends ModalRootProps {
  bedId: number | null;
  bedNumber: string;
}

interface AssignBedFormValues {
  check_in_id: number | null;
  timer_expires_at: string;
}

export default function AssignBedModal({
  bedId,
  bedNumber,
  ...props
}: AssignBedModalProps) {
  const assignBedMutation = useAssignBed();

  const form = useForm<AssignBedFormValues>({
    mode: "uncontrolled",
    initialValues: {
      check_in_id: null,
      timer_expires_at: "",
    },
    transformValues: ({ check_in_id, timer_expires_at }) => {
      const [minutes, seconds] = timer_expires_at.split(":").map(Number);

      return {
        check_in_id,
        timer_expires_at: dayjs()
          .add(dayjs.duration({ minutes, seconds }))
          .format("YYYY-MM-DD HH:mm:ss"),
      };
    },
    validate: {
      check_in_id: (value) =>
        value === null ? "Please select a student" : null,
      timer_expires_at: (value) => {
        if (!value) return "Please enter a timer";

        if (!TIMER_FORMAT.test(value)) {
          return "Timer must be in MM:SS format";
        }

        const [minutes, seconds] = value.split(":").map(Number);

        if (
          minutes > MAX_MINUTES ||
          (minutes === MAX_MINUTES && seconds !== 0)
        ) {
          return "Timer cannot exceed 60:00";
        }

        if (minutes === 0 && seconds === 0) {
          return "Timer must be greater than 00:00";
        }

        return null;
      },
    },
  });

  useEffect(() => {
    if (!props.opened) return;

    form.setInitialValues({ check_in_id: null, timer_expires_at: "" });
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.reset, form.setInitialValues, props.opened]);

  const handleSubmit = form.onSubmit(({ check_in_id, timer_expires_at }) => {
    if (check_in_id === null || !bedId) return;

    assignBedMutation.mutate(
      {
        checkInId: check_in_id,
        bed_id: bedId,
        timer_expires_at,
      },
      {
        onSuccess: () => {
          toast.success({ message: "Bed assigned successfully" });
          props.onClose();
        },
        onError: (error) => showToastError(error, "Failed to assign bed"),
      },
    );
  });

  const timerError = form.errors.timer_expires_at;

  return (
    <AppModal
      title={
        <Box>
          <Text size="xl" fw={600} lh={1}>
            Assign bed
          </Text>

          <Text size="sm">{bedNumber}</Text>
        </Box>
      }
      {...props}
    >
      <form onSubmit={handleSubmit}>
        <Stack pt="lg">
          <CheckInSelect
            value={form.useWatchValue("check_in_id")}
            error={form.errors.check_in_id}
            onChange={(value) => form.setFieldValue("check_in_id", value)}
            onClearError={() => form.clearFieldError("check_in_id")}
          />

          <Stack gap={0} align="center">
            <MaskInput
              variant="filled"
              size="lg"
              styles={{
                wrapper: {
                  width: 90,
                  marginInline: "auto",
                },
                input: {
                  fontWeight: 600,
                  fontVariantNumeric: "tabular-nums",
                  textAlign: "center",
                  backgroundColor: FIELD_BACKGROUND,
                },
              }}
              placeholder="__:__"
              mask={TIMER_MASK}
              modify={(value) => ({
                mask: value.replace(/\D/g, "").startsWith("6")
                  ? TIMER_MASK_LIMITED
                  : TIMER_MASK,
              })}
              onChangeRaw={(_, maskedValue) =>
                form.setFieldValue("timer_expires_at", maskedValue, {
                  forceUpdate: false,
                })
              }
              key={form.key("timer_expires_at")}
              error={!!timerError}
            />

            <Text fz={14} c={timerError ? "red.7" : "gray.7"}>
              {timerError || "Set timer"}
            </Text>
          </Stack>

          <Button
            loading={assignBedMutation.isPending}
            size="md"
            radius="xl"
            type="submit"
          >
            Continue
          </Button>
        </Stack>
      </form>
    </AppModal>
  );
}
