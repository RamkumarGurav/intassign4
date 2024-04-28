import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/helpers/fetcher";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { MicroscopeIcon, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import EmpListTable from "./Table";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

async function fetchData(path: string) {
  const res = await fetch(path, {
    method: "GET",
    headers: { Cookie: cookies().toString() },
    credentials: "include", // Ensure cookies are sent in the request
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return await res.json();
}
export default async function EmployeesListPage() {
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["employees"],
  //   queryFn: () => fetchData(`/api/v1/employees/authorised`),
  // });

  return (
    <section id="Section" className={` py-4 `}>
      <div className={` px-4 mx-auto `}>
        {/* <h1 className={`text-4xl`}>Section</h1> */}

        {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
        <EmpListTable />
        {/* </HydrationBoundary> */}
      </div>
    </section>
  );
}