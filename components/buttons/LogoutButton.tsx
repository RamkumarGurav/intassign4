"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "./LoadingButton";
import { Button, ButtonProps } from "../ui/button";
import { toast } from "react-hot-toast";

export default function LogoutButton({
  children,
  className = "",
  variant = "default",
}: ButtonProps) {
  const router = useRouter();
  const doLogout = async () => {
    const res = await fetch("/api/v1/auth/logout");
    if (!res.ok) {
      throw new Error("Error while logging out");
    }
    return await res.json();
  };
  const handleLogout = async () => {
    await doLogout();
    window.localStorage.clear();
    router.push("/login");
    toast.success("Logged Out");
  };
  return (
    <Button variant={variant} onClick={handleLogout} className={`${className}`}>
      {children}
    </Button>
  );
}
