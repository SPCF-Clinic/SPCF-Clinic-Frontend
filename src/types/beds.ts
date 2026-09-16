export type BedIndex = EmptyBed | OccupiedBed;

export interface EmptyBed {
	id: number;
	bed_number: string;
	status: "Empty";
	timer_started_at: null;
	timer_expires_at: null;
	timer_paused_at: null;
	current_occupant: null;
}

export interface OccupiedBed {
	id: number;
	bed_number: string;
	status: "Occupied";
	timer_started_at: string;
	timer_expires_at: string;
	timer_paused_at: string | null;
	current_occupant: CurrentOccupant;
}

export interface CurrentOccupant {
	user_id: number;
	occupant_name: string;
}
