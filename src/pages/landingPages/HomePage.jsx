import Hero from "../../components/landingComponents/Hero"
import TeamCards from "../../components/landingComponents/ToolServicesSection";
import PricingSection from "../../components/landingComponents/PricingSection";
import { Faq } from "../../components/landingComponents/Faq";
import LivePerfomanceSection from "../../components/landingComponents/LivePerfomanceSection";

function HomePage() {
  return (
    <main>
      <section className="sm:pt-10">
        <Hero />
      </section>

      <section className="sm:px-6 lg:px-8">
        <TeamCards />
      </section>

      <section className="sm:px-6 lg:px-8">
        <LivePerfomanceSection />
      </section>

      <section className="py-10 sm:px-6 lg:px-8">
        <PricingSection />
      </section>

      <section className="sm:px-6 lg:px-8 sm:pb-16">
        <Faq />
      </section>
    </main>
  );
}

export default HomePage;
