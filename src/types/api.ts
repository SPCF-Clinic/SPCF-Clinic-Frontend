export interface ApiResponse<T> {
	message: string;
	data: T;
	code: number;
	error: boolean;
}

export type PaginationQueryParams<T = Record<string, unknown>> = {
	per_page?: number;
	page?: number;
} & T;

export type CursorPaginationQueryParams<T = Record<string, unknown>> =
	PaginationQueryParams<T> & {
		cursor?: string;
	};

export interface CursorPaginationResponse<T> extends ApiResponse<T[]> {
	path: string;
	per_page: number;
	next_cursor: string | null;
	next_page_url: string | null;
	prev_cursor: string | null;
	prev_page_url: string | null;
}

export interface PaginationMeta {
	current_page: number;
	total_pages: number;
	count: number;
	per_page: number;
	total: number;
}

export type PaginationResponse<T, K extends string> = {
	[P in K]: T[];
} & {
	pagination: PaginationMeta;
};
