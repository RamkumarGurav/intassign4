"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/helpers/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Delete, Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CustomBreadcrumb } from "@/components/buttons/CustomBreadcrumb";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loading from "./loading";
import { TbH1 } from "react-icons/tb";

import Image from "next/image";

async function deleteFn(id: string) {
  const res = await fetch(`/api/v1/employees/authorised/${id}`, {
    method: "DELETE",
    credentials: "include", // Ensure cookies are sent in the request
  });

  return await res.json();
}

const formatTime = (dateString: string) => {
  return new Date(dateString)
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .split(" ")
    .join("-");
};

export default function EmpListTable() {
  const queryClient = useQueryClient();
  const [name, setName] = useState<any>("");
  const { data, isError, isLoading, refetch, error } = useQuery({
    queryKey: ["employees"],
    queryFn: () => fetcher(`/api/v1/employees/authorised?search=${name}`),
  });

  const mutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: () => {
      toast.error("Error while Deleting");
    },
  });

  useEffect(() => {
    if (name == "") {
      refetch();
    }
  }, [name, refetch]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    throw new Error(error.message);
  }

  const handleSearch = () => {
    refetch();
  };

  return (
    <section>
      <div className={`flex justify-between items-center gap-8 py-2`}>
        <div>
          <CustomBreadcrumb
            firstBread={{ link: "/", name: "Home" }}
            breads={[{ link: "/dashboard", name: "Dashboard" }]}
            lastBreadName="Employees List"
          />
        </div>
        <div className="flex justify-between items-center gap-8 ">
          <p>Total Count: {data.count}</p>
          <Link href="/dashboard/employees/create">
            <Button size="sm" className={`bg-blue-500 hover:bg-blue-600`}>
              +Create Employee
            </Button>
          </Link>
        </div>
      </div>
      <div className={`flex justify-end items-center`}>
        <div className="flex  w-full max-w-sm items-center space-x-2">
          <Input
            className="rounded-lg  focus-visible:ring-1 focus-visible:ring-gray-400  focus-visible:ring-offset-[0px]"
            placeholder="Search by Name..."
            type="search"
            onChange={(e) => setName(e.target.value)}
          />
          <Button className="rounded-lg" size="sm" onClick={handleSearch}>
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="block w-full overflow-x-auto mt-2 rounded-xl mx-[2px]">
        <table className="items-center w-full border-collapse text-blueGray-700   ">
          <thead className="thead-light bg-blue-900 text-gray-950">
            <tr>
              <th
                className="  text-center text-white
               text-base align-middle border border-solid border-blueGray-100 py-3 
                uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold"
              >
                ID
              </th>
              <th className="bg-blueGray-50 text-center text-white text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                Image
              </th>
              <th className="bg-blueGray-50 text-center text-white text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                Name
              </th>
              <th className="bg-blueGray-50 text-center text-white text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                Email
              </th>
              <th className="bg-blueGray-50 text-center text-white text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                Mobile No
              </th>
              <th className=" bg-blueGray-50 text-center text-white text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                Designation
              </th>
              <th className=" bg-blueGray-50 text-center text-white text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                Gender
              </th>
              <th className=" bg-blueGray-50 text-center text-white text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                Courses
              </th>
              <th className=" bg-blueGray-50 text-center text-white text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                Created Date
              </th>
              <th className=" bg-blueGray-50 text-center text-white text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.count == 0 && (
              <h1 className="text-4xl text-center m-10">No Employees </h1>
            )}
            {data.count > 0 &&
              data.data.map((item: any, i: number) => (
                <tr key={i} className="border-b-gray-400 border-b-[1px]">
                  <th className="border-t-0  align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                    {item._id}
                  </th>
                  <th className="border-t-0  align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                    <Image
                      src={`${item.imageObj.imageUrl}`}
                      width={500}
                      height={500}
                      alt="Picture of the author"
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  </th>
                  <td
                    className="border-t-0  align-middle border-l-0 border-r-0 text-sm
                 text-center whitespace-nowrap p-4 "
                  >
                    {item.name}
                  </td>
                  <td className="border-t-0  align-middle border-l-0 border-r-0 text-sm text-center whitespace-nowrap p-4 ">
                    {item.email}
                  </td>
                  <td className="border-t-0  align-middle border-l-0 border-r-0 text-sm text-center whitespace-nowrap p-4 ">
                    {item.mobile}
                  </td>
                  <td
                    className="border-t-0  align-middle border-l-0 border-r-0 text-sm 
                text-center whitespace-nowrap p-4  "
                  >
                    {item.designation}
                  </td>
                  <td className="border-t-0  align-middle border-l-0 border-r-0 text-sm text-center whitespace-nowrap p-4 ">
                    {item.gender}
                  </td>
                  <td className="border-t-0  align-middle border-l-0 border-r-0 text-sm text-center whitespace-nowrap p-4 ">
                    {item.courses.join(",")}
                  </td>
                  <td className="border-t-0  align-middle border-l-0 border-r-0 text-sm text-center whitespace-nowrap p-4 ">
                    {formatTime(item.createdAt)}
                  </td>
                  <td className="border-t-0  flex justify-between items-center gap-2  align-middle border-l-0 border-r-0 text-sm text-center whitespace-nowrap p-4 ">
                    <Link href={`/dashboard/employees/edit/${item._id}`}>
                      <Button size="sm">Edit</Button>
                    </Link>
                    <Button
                      size="sm"
                      className="min-w-[40px] p-0 "
                      variant="destructive"
                      disabled={mutation.isPending}
                      onClick={() => mutation.mutate(item._id)}
                    >
                      {mutation.isPending && mutation.variables === item._id ? (
                        <Loader2 className=" h-4 w-4 animate-spin" />
                      ) : (
                        <MdDelete size={25} />
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
