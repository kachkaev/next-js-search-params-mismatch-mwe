"use client";

import Link from "next/link";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import {
  NextPageSearchParamRecord,
  generateHref,
  stringifySearchParams,
} from "./url-helpers";

const assumedPathname = "/";

function NavItem({
  children,
  pathname,
  searchParamsOnClient,
  searchParamsOnServer,
  newSearchParamKey,
  newSearchParamValue,
}: {
  children: React.ReactNode;
  pathname: string;
  searchParamsOnClient: ReadonlyURLSearchParams;
  searchParamsOnServer: NextPageSearchParamRecord;
  newSearchParamKey: string;
  newSearchParamValue: string | undefined;
}) {
  const currentValueFromServer = searchParamsOnServer[newSearchParamKey];
  const currentValueFromHook =
    searchParamsOnClient.get(newSearchParamKey) ?? undefined;

  const newHref = generateHref(pathname, {
    ...Object.fromEntries(searchParamsOnClient.entries()),
    [newSearchParamKey]: newSearchParamValue,
  });

  return (
    <Link
      href={newHref}
      className={`border-2 hover:text-red-700 rounded ${
        newSearchParamValue === currentValueFromServer
          ? "border-stone-300"
          : "border-transparent"
      } ${
        newSearchParamValue === currentValueFromHook
          ? "bg-stone-200"
          : "text-sky-600"
      }`}
    >
      {children}
    </Link>
  );
}

export function PageClient({
  searchParamsOnServer,
}: {
  searchParamsOnServer: NextPageSearchParamRecord;
}) {
  const searchParamsOnClient = useSearchParams();

  return (
    <>
      <h2 className="font-bold pt-6 relative">
        <span className="absolute -left-5 bottom-2 block size-3 border-2 border-transparent rounded bg-stone-200" />
        Value on client in <code>useSearchParams()</code>
      </h2>
      <pre>{stringifySearchParams(searchParamsOnClient) || "-"}</pre>
      <nav>
        <h2 className="font-bold pt-6">Navigation between search params</h2>
        <div className="flex gap-2 *:p-2 font-mono pt-1">
          <span>a</span>
          {[undefined, "1", "2", "3"].map((a) => (
            <NavItem
              key={a ?? "undefined"}
              pathname={assumedPathname}
              searchParamsOnClient={searchParamsOnClient}
              searchParamsOnServer={searchParamsOnServer}
              newSearchParamKey="a"
              newSearchParamValue={a}
            >
              {a ?? "undefined"}
            </NavItem>
          ))}
        </div>
        <div className="flex gap-2 *:p-2 font-mono pt-1">
          <span>b</span>
          {[undefined, "1", "2", "3"].map((b) => (
            <NavItem
              key={b ?? "undefined"}
              pathname={assumedPathname}
              searchParamsOnClient={searchParamsOnClient}
              searchParamsOnServer={searchParamsOnServer}
              newSearchParamKey="b"
              newSearchParamValue={b}
            >
              {b ?? "undefined"}
            </NavItem>
          ))}
        </div>
      </nav>
    </>
  );
}
