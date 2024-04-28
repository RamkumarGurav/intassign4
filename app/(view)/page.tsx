import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Layout/Navbar";
import HomeNavbar from "@/components/Layout/HomeNavbar";
import Footer from "@/components/Layout/Footer";
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
      <HomeNavbar />
      <section
        id="Section"
        className={` py-[35px] sm:py-[50px] sm:px-[35px] xl:px-[70px] min-h-screen`}
      >
        <div className={` px-4 mx-auto `}>
          <h1 className={`text-4xl text-center mt-10`}>Welcome to Home Page</h1>
        </div>
      </section>
      <Footer />
    </div>
  );
}
