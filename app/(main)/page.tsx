import Hero from "@/components/Hero";
import Hosting from "@/components/Hosting";
import Conclave from "@/components/Conclave";
import Workflow from "@/components/Workflow";
import Backbone from "@/components/Backbone";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Hero />
      <Hosting />
      <Conclave />
      <Workflow />
      <Backbone />
    </main>
  );
}
