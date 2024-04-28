"use client";
import { MdError } from "react-icons/md";
import { useEffect } from "react";
import { IoMdHome } from "react-icons/io";
import { TbReload } from "react-icons/tb";
import Link from "next/link";
import { Open_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";
const font = Open_Sans({ weight: "400", subsets: ["latin"] });
export default function Error({ error, reset }: any) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div
      className={`min-h-[90vh] pt-[50px] flex justify-center bg-white ${font.className}`}
    >
      <div
        className="p-3 m-3  |||  text-xl font-bold text-center  ||| 
         |||  "
      >
        <div className={`inline-block rounded-full p-2 bg-gray-200`}>
          <MdError size={40} />
        </div>
        <h2 className={`text-red-600 `}>Oops! Something went wrong</h2>
        {process.env.NEXT_PUBLIC_APP_ENV == "development" ? (
          <h2 className={`text-base text-gray-600 `}>
            Error : {error.message}
          </h2>
        ) : (
          <h2 className={`sm:w-[400px] text-sm font-medium text-gray-600 `}>
            We are working on the problem right away. Please click on Try again
            or home button to continue using this app.
          </h2>
        )}

        <div className={`flex gap-4 justify-center mt-4`}>
          <Button onClick={() => reset()}>
            <TbReload className="mr-2 h-4 w-4" /> Try Again
          </Button>
          {/* <Button
            leftIcon={<TbReload />}
            color="gray.800"
            backgroundColor="gray.800"
            textColor="white"
            className={` !font-semibold hover:!text-gray-800  |||  hover:!bg-white  |||  border-transparent !border-gray-800`}
            variant="outline"
            size="sm"
            onClick={() => reset()}
          >
            Try again
          </Button> */}
          <Link href="/">
            <Button>
              <IoMdHome className="mr-2 h-4 w-4" /> Home
            </Button>
            {/* <Button
              leftIcon={<IoMdHome />}
              color="gray-800"
              backgroundColor="white"
              textColor="gray-800"
              borderColor="gray-800"
              className={`!font-semibold hover:!text-white |||  hover:!bg-gray-800   |||  !border-gray-800`}
              variant="outline"
              size="sm"
            >
              Home
            </Button> */}
          </Link>
        </div>
      </div>
    </div>
  );
}
