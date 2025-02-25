import Image from "next/image";
import Navbar from "./components/navbar";
import Header from "./components/header";
import { CategoryTabs } from "./components/category-tabs";
import { MdContactSupport } from "react-icons/md";
import Highlights from "./components/highlights";
import Services from "./components/services";
import Ads from "./components/ads";
import CalltoAction from "./components/calltoaction";
import Download from "./components/download";
import Footer from "./components/footer";
import { FloatingNavbar } from "./components/floatingNav";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <Header />
      <CategoryTabs />
      <Services />
      <Highlights />
      <Ads />
      <CalltoAction />
      <Download />
      <Footer />
      <FloatingNavbar />
      <div className="fixed bottom-6 right-6">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white font-medium rounded-full px-4 py-2 flex items-center justify-center hover:bg-blue-800 transition duration-300 ease-in-out shadow-lg"
        >
          <span className="text-lg mr-2 hidden md:block">
            <MdContactSupport />
          </span>
          Support
        </a>
      </div>
    </div>
  );
}
