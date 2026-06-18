import principalImg from "@/src/assets/images/Principal.png";
import ceoImg from "@/src/assets/images/CEO.png";
import mentorImg from "@/src/assets/images/Mentor.jpg";
import staffImg from "@/src/assets/images/Staff.jpg";
import unknown from "@/src/assets/images/unknown.webp";

export default function Backbone() {
  const PEOPLE = [
    {
      id: 1,
      name: "Dr.P Suresh Venugopal",
      role: "Principal",
      //badge: "Patron",
      image: principalImg.src
    },
    {
      id: 2,
      name: "Salim",
      role: "CEO",
      //badge: "Leadership",
      image: ceoImg.src
    },
    {
      id: 3,
      name: "Immanuel Varghese",
      role: "Startup Mentor",
      //badge: "Mentor",
      image: mentorImg.src,
      objectPosition: "object-top"
    },
    {
      id: 4,
      name: "Dr.Amal Thomas",
      role: "Staff Coordinator",
      //badge: "Coordinator",
      image: staffImg.src
    }
  ];

  return (
    <section id="backbone" className="w-full py-20 lg:py-28 bg-surface-elevated relative overflow-hidden">
      {/* Background Variation */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header (Split on desktop) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-400 mb-4 inline-block">
              The Backbone
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-semibold tracking-tight text-white leading-tight">
              Backed by the people <span className="gradient-text-gold">who matter.</span>
            </h2>
          </div>
          <div className="max-w-md pb-1">
            <p className="text-lg text-white/60 leading-relaxed">
              Our ecosystem is steered by active operators, deep-tech investors, and decision-makers who bring real capital and market access to the table.
            </p>
          </div>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PEOPLE.map((person) => (
            <div
              key={person.id}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden group bg-background"
            >
              {/* Image */}
              <img
                src={person.image}
                alt={person.name}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
                  person.objectPosition || "object-center"
                }`}
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300 group-hover:from-black" />

              {/* Top Badge */}
              {/* <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                <span className="glass px-3 py-1 rounded-full text-xs font-medium text-white/90 shadow-xl">
                  {person.badge}
                </span>
              </div> */}

              {/* Bottom Content */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-col justify-end h-full">
                <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-1">
                      {person.name}
                    </h3>
                    <p className="text-sm font-mono text-gold-400 uppercase tracking-wide">
                      {person.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
