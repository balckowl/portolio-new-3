import Header  from "./components/layouts/header";
import About from "./components/home/about";
import Hero from "./components/home/hero";
import HowTo from "./components/home/howTo/how-to";
import Start from "./components/home/start";
import Footer from "./components/layouts/footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <HowTo />
      <Start />
      <Footer />
    </div>
  );
}
