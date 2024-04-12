import { ReadonlyURLSearchParams } from "next/navigation";

export type NextPageSearchParam = string | string[];
export type NextPageSearchParamRecord = Record<string, NextPageSearchParam>;

export type SearchParam = NextPageSearchParam | number | null | undefined;
export type SearchParamRecord = Record<string, SearchParam>;

export type SearchParamsLike =
  | ReadonlyURLSearchParams
  | SearchParamRecord
  | URLSearchParams
  | undefined;

function cleanupSearchParams<T extends SearchParamRecord>(
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
