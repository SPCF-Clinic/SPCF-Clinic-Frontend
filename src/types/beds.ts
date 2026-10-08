export type BedIndex = EmptyBed | OccupiedBed;

export interface EmptyBed {
  id: number;
  bed_number: string;
  check_in_id: null;
  status: "Empty";
  timer_started_at: null;
  timer_expires_at: null;
  timer_paused_at: null;
  timer_resumed_at: null;
  effective_started_at: null;
  current_occupant: null;
}

export interface OccupiedBed {
  id: number;
  bed_number: string;
  check_in_id: number;
  status: "Occupied";
  timer_started_at: string;
  timer_expires_at: string;
  timer_paused_at: string | null;
  timer_resumed_at: string | null;
  effective_started_at: string | null;
  current_occupant: CurrentOccupant;
}

export interface CurrentOccupant {
  user_id: number;
  occupant_name: string;
  reason_for_visit?: string | null;
}

export interface BedTimerControls {
  bed_number: string;
  timer_started_at: string;
  timer_expires_at: string;
  timer_paused_at: string | null;
  timer_resumed_at?: string | null;
  effective_started_at?: string | null;
  check_in_id?: number | null;
  id?: number;
  current_occupant: CurrentOccupant;
}
