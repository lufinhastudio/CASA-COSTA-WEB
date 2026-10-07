import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { HouseMap } from "@/components/home/HouseMap";
import { Brands } from "@/components/home/Brands";
import { PalmDivider } from "@/components/ui/PalmDivider";
import { Cafe } from "@/components/home/Cafe";
import { Agenda } from "@/components/home/Agenda";
import { Join } from "@/components/home/Join";
import { Visit } from "@/components/home/Visit";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <HouseMap />
      <PalmDivider />
      <Brands />
      <Cafe />
      <Agenda />
      <Join />
      <Visit />
    </>
  );
}
