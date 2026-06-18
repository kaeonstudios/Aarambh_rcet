import Hero from "@/components/Hero";
import Hosting from "@/components/Hosting";
import Conclave from "@/components/Conclave";
import Workflow from "@/components/Workflow";
import Backbone from "@/components/Backbone";
// import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <JsonLd />
      <Hero />
      <Hosting />
      <Conclave />
      <Workflow />
      <Backbone />
      {/* <FAQ /> */}
    </main>
  );
}
