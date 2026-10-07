import { createParser, parseAsInteger, useQueryState } from "nuqs";

/** The student list's `page` URL param, 1-based. Anything that does
 *  not parse as a page number of at least 1 — a hand-edited
 *  `page=abc`, `page=0` or `page=-1` included — falls back to the
 *  default, so the request never carries a `page` the endpoint's
 *  validation would reject. Pushes history, so the back button
 *  returns to the previous page. */
const pageParam = createParser({
  parse: (value) => {
    const page = parseAsInteger.parse(value);
    return page !== null && page >= 1 ? page : null;
  },
  serialize: (value) => String(value),
})
  .withDefault(1)
  .withOptions({ history: "push" });

export function useStudentPage() {
  return useQueryState("page", pageParam);
}
