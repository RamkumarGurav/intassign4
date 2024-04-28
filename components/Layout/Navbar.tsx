"use client";
import Link from "next/link";
import LogoutButton from "../buttons/LogoutButton";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ImFire } from "react-icons/im";
import { CircleUser } from "lucide-react";
export default function Navbar() {
  const [userData, setUserData] = useState<any>("");

  useEffect(() => {
    const storedData = window.localStorage.getItem("userData");
    setUserData(storedData ? JSON.parse(storedData) : "");
  }, []);

  return (
    <nav className={` text-white shadow bg-black  py-4 px-4`}>
      <div className={` px-4 flex justify-between items-center`}>
        <div>
          <ImFire size={30} />
        </div>

        <div className={`flex items-center text-white gap-x-10`}>
          <Link href="/" className="hover:text-yellow-400">
            Home
          </Link>
          <Link href="/dashboard" className="hover:text-yellow-400">
            Dashboard
          </Link>
          <Link
            href="/dashboard/employees/list"
            className="hover:text-yellow-400"
          >
            Employees List
          </Link>
          <div className="flex gap-1">
            <span>
              <CircleUser className="text-yellow-300" />
            </span>
            <span className="text-yellow-300 font-semibold">
              {userData ? userData?.username : "Hi!"}
            </span>
          </div>
          <LogoutButton variant="outline" className="text-black">
            Logout
          </LogoutButton>
        </div>
      </div>
    </nav>
  );
}
