import { ReadonlyURLSearchParams } from "next/navigation";

export type SearchParamsRecord = Record<
  string,
  string | string[] | number | undefined | null
>;

export type SearchParamsLike =
  | ReadonlyURLSearchParams
  | SearchParamsRecord
  | URLSearchParams
  | undefined;

function cleanupSearchParams<T extends SearchParamsRecord>(
  payload: T
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(payload)
      .filter(
        (pair): pair is [string, string] =>
          pair[1] !== undefined && pair[1] !== null
      )
      .map(([key, value]) => [key, value.toString()])
  );
}

export function stringifySearchParams(searchParams: SearchParamsLike): string {
  return searchParams instanceof ReadonlyURLSearchParams ||
    searchParams instanceof URLSearchParams
    ? searchParams.toString()
    : searchParams
    ? new URLSearchParams(cleanupSearchParams(searchParams)).toString()
    : "";
}

export function generateHref(
  pathname: string,
  searchParams: SearchParamsLike,
  hash?: string | undefined
): string {
  const stringifiedSearchParams = stringifySearchParams(searchParams);

  return `${pathname}${
    stringifiedSearchParams ? `?${stringifiedSearchParams}` : ""
  }${hash ? `#${hash}` : ""}`;
}
