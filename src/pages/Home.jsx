


import CareDuelBanner from "../components/CareDualBanner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Payment from "../components/SeoCopy";
import RaffleWidget from "../components/RaffleWidget";
import StoryGrid from "../components/StoryGrid";
import SubmitForm from "../components/SubmitForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        <Hero />
        <CareDuelBanner/>
        <StoryGrid />
        <RaffleWidget/>
        <Payment/>
        <SubmitForm />
      </main>
      <Footer />
    </div>
  );
}
