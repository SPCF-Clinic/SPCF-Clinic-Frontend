export interface StudentIndex {
	id: number;
	username: string;
	name: string;
	grade_level: string | null;
	year_level: string | null;
	course: string | null;
	age: number;
	sex: "MALE" | "FEMALE";
	status: string;
}

export interface StudentShow {
	id: number;
	username: string;
	personal_info: Fields[];
	medical_history: Fields[];
	contact_person: {
		name: string;
		number: string;
	};
	illnesses: string[];
}

export interface Fields {
	id: number;
	name: string;
	form_order: number;
	value: string[] | string;
	additional_fields: AdditionalField[];
}

export interface AdditionalField {
	id: number;
	name: string;
	value: null | string;
}
