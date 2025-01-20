import Image from "next/image";
import Navbar from "./components/navbar";
import Header from "./components/header";
import { CategoryTabs } from "./components/category-tabs";
import Popular from "./components/popular";
import Highlights from "./components/highlights";
import Services from "./components/services";
import Ads from "./components/ads";
import CalltoAction from "./components/calltoaction";
import Download from "./components/download";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div>
      
      <Navbar />
      <CategoryTabs />
      
      <Popular />
      <Services />
      <Highlights />
      <Ads />
      <CalltoAction />
      <Download />
      <Footer />
    </div>
  );
}
