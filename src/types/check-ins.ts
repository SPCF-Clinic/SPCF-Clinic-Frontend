export interface CheckInIndex {
	id: number;
	user: CheckInStudent;
	reason_for_visit: string;
	check_in_time: string;
	items_dispensed: ItemsDispensed[];
	remarks: string | null;
}

export interface CheckInStudent {
	id: number;
	name: string;
	age: number;
	grade_level: string | null;
	year_level: string | null;
	course: string | null;
}

export interface ItemsDispensed {
	name: string;
	quantity: number;
}

export interface CheckInShow {
	id: number;
	name: string;
	grade_level: string | null;
	year_level: string | null;
	course: string | null;
	check_in_time: string;
	reason_for_visit: string;
	remarks: string | null;
	bed_id: number | null;
	items_dispensed: ItemsDispensed[];
}
