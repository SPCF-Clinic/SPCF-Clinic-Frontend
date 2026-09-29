import { useState } from 'react';
import { Box, Input, Stack, Text, UnstyledButton } from '@mantine/core';

export type CheckboxOption = string | { value: string; label?: string };

interface CheckboxInputProps {
  label?: string;
  description?: string | null;
  error?: React.ReactNode;
  withAsterisk?: boolean;
  options?: CheckboxOption[];
  data?: string[] | string;
  onChange?: (value: string[]) => void;
}

export default function CheckboxInput({
  label,
  description,
  error,
  withAsterisk,
  options,
  data,
  onChange,
}: CheckboxInputProps) {
  const [internalSelected, setInternalSelected] = useState<string[]>([]);

  const normalizeData = (val: string[] | string | undefined): string[] => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string' && val.trim() !== '') return [val];
    return [];
  };

  const selectedValues = data !== undefined ? normalizeData(data) : internalSelected;

  const handleToggle = (optionValue: string) => {
    const nextValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((v) => v !== optionValue)
      : [...selectedValues, optionValue];

    if (data === undefined) {
      setInternalSelected(nextValues);
    }
    if (onChange) {
      onChange(nextValues);
    }
  };

  return (
    <Input.Wrapper
      label={label}
      description={description}
      error={error}
      withAsterisk={withAsterisk}
      styles={{
        label: {
          fontWeight: 600,
          color: '#4a4a4a',
          fontSize: 13,
          marginBottom: 6,
        },
      }}
    >
      <Stack gap="xs" style={{ maxWidth: 400, marginTop: 4 }}>
        {options?.map((option) => {
          const optionLabel = typeof option === 'string' ? option : option.label ?? option.value;
          const optionValue = typeof option === 'string' ? option : option.value;
          const isChecked = selectedValues.includes(optionValue);

          return (
            <UnstyledButton
              key={optionValue}
              onClick={() => handleToggle(optionValue)}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: 42,
                backgroundColor: '#ffffff',
                border: '1px solid #dcdcdc',
                borderRadius: 4,
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <Box
                style={{
                  width: 42,
                  height: '100%',
                  borderRight: '1px solid #dcdcdc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#ffffff',
                  flexShrink: 0,
                }}
              >
                <Box
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    border: isChecked ? '5px solid #228be6' : '1.5px solid #777777',
                    backgroundColor: 'transparent',
                    transition: 'all 150ms ease',
                  }}
                />
              </Box>

              <Box
                style={{
                  flex: 1,
                  paddingLeft: 12,
                  paddingRight: 12,
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: isChecked ? '#111111' : '#4a4a4a',
                    fontWeight: isChecked ? 500 : 400,
                  }}
                >
                  {optionLabel}
                </Text>
              </Box>
            </UnstyledButton>
          );
        })}
      </Stack>
    </Input.Wrapper>
  );
}