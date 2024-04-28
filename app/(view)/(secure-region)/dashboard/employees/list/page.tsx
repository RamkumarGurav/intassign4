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
