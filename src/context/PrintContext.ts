import { createContext } from "react";

type PrintContextValue = {
	contentRef: React.RefObject<HTMLDivElement>;
};

export const PrintContext = createContext<PrintContextValue | null>(null);
