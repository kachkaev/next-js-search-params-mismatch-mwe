import { PageClient } from "./page-client";
import * as React from "react";
import {
  NextPageSearchParamRecord,
  stringifySearchParams,
} from "./url-helpers";
import { SearchParamsFixer } from "./search-params-fixer";

export default function Home({
  searchParams,
}: {
  searchParams: NextPageSearchParamRecord;
}) {
  return (
    <>
      <div>
        <h1 className="text-xl font-bold">Discrepancy in searchParams</h1>
        <h2 className="font-bold pt-6 relative">
          <span className="absolute -left-5 bottom-2 block size-3 border-2 border-stone-300 rounded" />
          Value on server in <code>page.tsx</code> arg
        </h2>
        <pre>{stringifySearchParams(searchParams) || "-"}</pre>
      </div>
      <React.Suspense>
        <PageClient searchParamsOnServer={searchParams} />
        <SearchParamsFixer searchParams={searchParams} />
      </React.Suspense>
    </>
  );
}

export const dynamic = "force-dynamic";
