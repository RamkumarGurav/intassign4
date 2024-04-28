import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Layout/Navbar";
export default function Home() {
  return (
    <div>
      {/* <nav className={` bg-yellow-500 py-4 px-4`}>
        <div className={` px-4 flex justify-between items-center`}>
          <h1>LOGO</h1>

          <div className={`flex items-center gap-x-4`}>
            <Link href="/">Home</Link>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </nav> */}
      <Navbar />
      <section
        id="Section"
        className={` py-[35px] sm:py-[50px] sm:px-[35px] xl:px-[70px]`}
      >
        <div className={` px-4 mx-auto `}>
          <h1 className={`text-4xl`}>Section</h1>
        </div>
      </section>
    </div>
  );
}
