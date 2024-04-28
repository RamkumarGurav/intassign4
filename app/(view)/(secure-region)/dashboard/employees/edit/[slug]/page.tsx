"use client";
import { useQuery } from "@tanstack/react-query";
import EmpEditCard from "./EmpEditCard";
import { fetcher } from "@/lib/helpers/fetcher";
import Loading from "@/app/(view)/(secure-region)/loading";

export default function EmployeesEditPage({
  params,
}: {
  params: { slug: string };
}) {
  const id = params.slug;
  const { data, isError, isLoading, refetch, error } = useQuery({
    queryKey: ["employee", { id }],
    queryFn: () => fetcher(`/api/v1/employees/authorised/${id}`),
  });

  if (isLoading || !data) {
    return <Loading />;
  }

  if (isError) {
    throw new Error(error.message);
  }

  return (
    <section className={` py-4 `}>
      <div className={` px-4 mx-auto `}>
        <EmpEditCard empData={data.data} />
      </div>
    </section>
  );
}
