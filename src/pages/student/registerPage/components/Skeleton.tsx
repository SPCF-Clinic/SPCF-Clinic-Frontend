import { Skeleton, Stack, Grid, Box, Paper } from '@mantine/core';

export default function SectionSkeleton(){return (
    <>
      <Stack gap="md">
        {/* Header Title / Badge */}
        <Skeleton height={12} width="40%" radius="xl" />

        {/* Step Indicator Subtitle */}
        <Skeleton height={10} width="20%" radius="xl" mt={-4} />

        {/* Main Heading & Subtext */}
        <Box>
          <Skeleton height={28} width="70%" radius="sm" mb={8} />
          <Skeleton height={12} width="90%" radius="xl" />
        </Box>

        {/* --- PERSONAL INFO FIELDS --- */}
        {/* First Name */}
        <Stack gap={6}>
          <Skeleton height={12} width="25%" radius="xl" />
          <Skeleton height={36} radius="sm" />
        </Stack>

        {/* Surname */}
        <Stack gap={6}>
          <Skeleton height={12} width="20%" radius="xl" />
          <Skeleton height={36} radius="sm" />
        </Stack>

        {/* Middle Name */}
        <Stack gap={6}>
          <Skeleton height={12} width="30%" radius="xl" />
          <Skeleton height={36} radius="sm" />
        </Stack>

        {/* Date of Birth (3 Segmented Dropdowns) */}
        <Stack gap={6}>
          <Skeleton height={12} width="30%" radius="xl" />
          <Grid gutter={0}>
            <Grid.Col span={4}>
              <Skeleton height={36} radius={0} style={{ borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }} />
            </Grid.Col>
            <Grid.Col span={4}>
              <Skeleton height={36} radius={0} />
            </Grid.Col>
            <Grid.Col span={4}>
              <Skeleton height={36} radius={0} style={{ borderTopRightRadius: 6, borderBottomRightRadius: 6 }} />
            </Grid.Col>
          </Grid>
        </Stack>

        {/* Gender (Segmented/Radio) */}
        <Stack gap={6}>
          <Skeleton height={12} width="20%" radius="xl" />
          <Grid gutter={8}>
            <Grid.Col span={6}>
              <Skeleton height={36} radius="sm" />
            </Grid.Col>
            <Grid.Col span={6}>
              <Skeleton height={36} radius="sm" />
            </Grid.Col>
          </Grid>
        </Stack>

        {/* Religion & Nationality Side-by-Side */}
        <Grid gutter="xs">
          <Grid.Col span={6}>
            <Stack gap={6}>
              <Skeleton height={12} width="40%" radius="xl" />
              <Skeleton height={36} radius="sm" />
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack gap={6}>
              <Skeleton height={12} width="45%" radius="xl" />
              <Skeleton height={36} radius="sm" />
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Address */}
        <Stack gap={6}>
          <Skeleton height={12} width="20%" radius="xl" />
          <Skeleton height={36} radius="sm" />
        </Stack>

        {/* Contact No. */}
        <Stack gap={6}>
          <Skeleton height={12} width="30%" radius="xl" />
          <Skeleton height={36} radius="sm" />
        </Stack>

        {/* --- EDUCATION LEVEL SECTION --- */}
        <Grid align="center" my="xs">
          <Grid.Col span={3}><Skeleton height={2} /></Grid.Col>
          <Grid.Col span={6}><Skeleton height={10} radius="xl" /></Grid.Col>
          <Grid.Col span={3}><Skeleton height={2} /></Grid.Col>
        </Grid>

        <Stack gap={6}>
          <Skeleton height={12} width="30%" radius="xl" />
          <Skeleton height={36} radius="sm" />
        </Stack>

        {/* --- PARENT INFORMATION SECTION --- */}
        <Grid align="center" my="xs">
          <Grid.Col span={3}><Skeleton height={2} /></Grid.Col>
          <Grid.Col span={6}><Skeleton height={10} radius="xl" /></Grid.Col>
          <Grid.Col span={3}><Skeleton height={2} /></Grid.Col>
        </Grid>

        <Stack gap={6}>
          <Skeleton height={12} width="35%" radius="xl" />
          <Skeleton height={36} radius="sm" />
        </Stack>
        <Stack gap={6}>
          <Skeleton height={12} width="30%" radius="xl" />
          <Skeleton height={36} radius="sm" />
        </Stack>

        {/* --- GUARDIAN INFORMATION SECTION --- */}
        <Grid align="center" my="xs">
          <Grid.Col span={3}><Skeleton height={2} /></Grid.Col>
          <Grid.Col span={6}><Skeleton height={10} radius="xl" /></Grid.Col>
          <Grid.Col span={3}><Skeleton height={2} /></Grid.Col>
        </Grid>

        <Stack gap={6}>
          <Skeleton height={12} width="40%" radius="xl" />
          <Skeleton height={36} radius="sm" />
        </Stack>
        <Stack gap={6}>
          <Skeleton height={12} width="45%" radius="xl" />
          <Skeleton height={36} radius="sm" />
        </Stack>

        {/* --- EMERGENCY CONTACT SECTION --- */}
        <Grid align="center" my="xs">
          <Grid.Col span={3}><Skeleton height={2} /></Grid.Col>
          <Grid.Col span={6}><Skeleton height={10} radius="xl" /></Grid.Col>
          <Grid.Col span={3}><Skeleton height={2} /></Grid.Col>
        </Grid>

        <Stack gap={6}>
          <Skeleton height={12} width="35%" radius="xl" />
          <Skeleton height={36} radius="sm" />
        </Stack>
        <Stack gap={6}>
          <Skeleton height={12} width="30%" radius="xl" />
          <Skeleton height={36} radius="sm" />
        </Stack>

        {/* Continue Button */}
        <Skeleton height={42} radius="xl" mt="md" />
      </Stack>
    </>
  );}