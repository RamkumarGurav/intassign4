// import FooterBottom from "@/components/Layout/Frontend/Footer/FooterBottom";
// import Navbar1 from "@/components/Layout/Frontend/Navbar/Navbar1";
// import ScrollToTop from "@/components/Layout/Frontend/Stickers/ScrollToTop";
import { getSession } from "@/app/api/_api_auth/auth";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import NextTopLoader from "nextjs-toploader";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getSession();

  return (
    <div className={` `}>
      <NextTopLoader color="#ffc107" />
      <Navbar />
      <main className={`overflow-hidden min-h-screen`}>{children}</main>
      <Footer />
    </div>
  );
}
