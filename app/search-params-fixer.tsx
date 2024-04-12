"use client";

// Source: https://github.com/kachkaev/next-js-search-params-mismatch-mwe/pull/1
// Context: https://github.com/vercel/next.js/issues/64170

import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import {
  NextPageSearchParamRecord,
  stringifySearchParams,
} from "./url-helpers";

export function SearchParamsFixer({
  searchParams: searchParamsOnServer,
}: {
  searchParams: NextPageSearchParamRecord;
}) {
  const searchParamsOnClient = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    const stringifiedSearchParamsOnServer =
      stringifySearchParams(searchParamsOnServer);
    const stringifiedSearchParamsOnClient =
      stringifySearchParams(searchParamsOnClient);

    if (stringifiedSearchParamsOnServer === stringifiedSearchParamsOnClient) {
      return;
    }

    const timeout = setTimeout(() => {
      router.refresh();
      // eslint-disable-next-line no-console
      console.warn(
        `SearchParamsFixer: refreshing page\n  [server] ${
          stringifiedSearchParamsOnServer || "-"
        }\n  [client] ${stringifiedSearchParamsOnClient || "-"}`
      );
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [router, searchParamsOnClient, searchParamsOnServer]);

  return <></>;
}
