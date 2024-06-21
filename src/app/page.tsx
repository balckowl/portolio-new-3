import About from "./components/home/about";
import Hero from "./components/home/hero";
import HowTo from "./components/home/howTo/how-to";
import Start from "./components/home/start";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <HowTo />
      <Start />
    </div>
  );
}
