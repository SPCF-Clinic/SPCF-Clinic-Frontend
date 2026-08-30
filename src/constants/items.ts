import type { ItemType } from "@/types/items";

export const ITEM_CATEGORIES = {
	Medicine: ["Pain Reliever", "Antibiotic", "Cough & Cold", "Antihistamine"],
	Supply: ["Wound Care", "PPE"],
} as const;

export const ITEM_UNITS = {
	Medicine: ["Tablets", "Boxes", "Bottles"],
	Supply: ["Packs", "Boxes", "Pairs", "Rolls"],
} as const;

export const ITEM_CONTENT_UNITS = {
	Medicine: {
		Boxes: ["Tablets", "Bottles"],
		Bottles: ["ml"],
	},
	Supply: {
		Boxes: ["Packs", "Pairs", "Rolls"],
	},
} as const;

export const LOW_STOCK_LIMITS = {
	Medicine: {
		Tablets: 10,
		Boxes: 5,
		Bottles: 5,
	},
	Supply: {
		Packs: 5,
		Boxes: 5,
		Pairs: 5,
		Rolls: 5,
	},
} satisfies {
	[T in ItemType]: Record<(typeof ITEM_UNITS)[T][number], number>;
};
