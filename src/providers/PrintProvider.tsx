import { type PropsWithChildren, useRef } from "react";
import { PrintContext } from "@/context/PrintContext";

export function PrintProvider({ children }: PropsWithChildren) {
	const contentRef = useRef<HTMLDivElement>(null);

	return (
		<PrintContext.Provider value={{ contentRef }}>
			{children}
		</PrintContext.Provider>
	);
}
