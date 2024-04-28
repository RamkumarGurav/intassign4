import EmpCreateCard from "./EmpCreateCard";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create Employee"
 
};

export default function EmployeesAddPage() {
  return (
    <section className={` py-4 `}>
      <div className={` px-4 mx-auto `}>
        <EmpCreateCard />
      </div>
    </section>
  );
}
