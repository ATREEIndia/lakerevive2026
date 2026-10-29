import LakePlanner from "@/components/LakePlanner";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";

export default function Tool2() {
  return <main>
    <Navbar currentpage='Tool'></Navbar>
    <Banner title='NbS design tool'></Banner>
    <LakePlanner />;
  </main>
  
  
}
