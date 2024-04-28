import EmpListTable from "./Table";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Employees List",
};

export const dynamic = "force-dynamic";

export default async function EmployeesListPage() {
  return (
    <section id="Section" className={` py-4 `}>
      <div className={`  mx-auto `}>
        <EmpListTable />
      </div>
    </section>
  );
}
