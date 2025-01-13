import Image from "next/image";
import Navbar from "./components/navbar";
import Header from "./components/header";
import Topnav from "./components/topnav";
import Popular from "./components/popular";
import Highlights from "./components/highlights";
import Services from "./components/services";
import Ads from "./components/ads";
import CalltoAction from "./components/calltoaction";
import Download from "./components/download";

export default function Home() {
  return (
    <div>
      <Topnav />
      <Navbar />
      <Header />
      <Popular />
      <Services />
      <Highlights />
      <Ads />
      <CalltoAction />
      <Download />
    </div>
  );
}
