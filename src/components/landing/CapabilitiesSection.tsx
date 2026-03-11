import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Briefcase, Car, Flame, Leaf, ChevronDown } from "lucide-react";

const categories = [
  {
    icon: <Users className="w-5 h-5" />,
    title: "People & Safety",
    desc: "Monitor human activity patterns & safety compliance",
    models: ["Intrusion Detection", "Fall Detection", "PPE Compliance", "Crowd Density", "Loitering"],
    color: "from-blue-500/10 to-blue-500/5",
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    title: "Workplace & Productivity",
    desc: "Track operational efficiency and access control",
    models: ["Attendance Tracking", "Idle Detection", "Zone Monitoring", "Unauthorized Access"],
    color: "from-violet-500/10 to-violet-500/5",
  },
  {
    icon: <Car className="w-5 h-5" />,
    title: "Vehicles & Traffic",
    desc: "Manage parking, traffic flow, and plate recognition",
    models: ["License Plate Recognition", "Wrong-way Detection", "Parking Violations", "Vehicle Counting"],
    color: "from-emerald-500/10 to-emerald-500/5",
  },
  {
    icon: <Flame className="w-5 h-5" />,
    title: "Fire & Infrastructure",
    desc: "Detect hazards before they escalate",
    models: ["Smoke Detection", "Fire Detection", "Structural Monitoring", "Equipment Status"],
    color: "from-red-500/10 to-red-500/5",
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    title: "Environment & Hygiene",
    desc: "Ensure cleanliness and environmental standards",
    models: ["Waste Detection", "Spill Detection", "Cleanliness Monitoring", "Water Level"],
    color: "from-green-500/10 to-green-500/5",
  },
];

const CapabilitiesSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="capabilities" className="py-24 md:py-32 bg-sohub-gray-50 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6">
        <ScrollReveal>
          <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-sohub-orange mb-4">Capabilities</p>
          <h2 className="text-section-mobile md:text-section text-center text-foreground mb-4">
            Real-time detection across critical areas.
          </h2>
          <p className="text-center text-muted-foreground text-body-lg mb-16 max-w-xl mx-auto">
            Select AI models based on your environment and risk profile.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <motion.div
                layout
                whileHover={{ y: -4 }}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 ${expanded === i
                    ? "bg-background border-sohub-orange/30 shadow-lg ring-1 ring-sohub-orange/10"
                    : "bg-background border-border hover:border-sohub-orange/20 hover:shadow-md"
                  }`}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-sohub-orange/8 flex items-center justify-center text-sohub-orange mb-4 group-hover:bg-sohub-orange/12 transition-colors">
                    {cat.icon}
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{cat.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{cat.desc}</p>

                  <div
                    onMouseEnter={() => setExpanded(i)}
                    onMouseLeave={() => setExpanded(null)}
                    className="pt-1"
                  >
                    <div className="flex items-center gap-1 text-xs text-sohub-orange font-medium w-fit cursor-pointer">
                      <span>{cat.models.length} models</span>
                      <motion.div animate={{ rotate: expanded === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="w-3 h-3" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {expanded === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-border/50 pt-3 mt-3 space-y-1.5 pb-1">
                            {cat.models.map((m, j) => (
                              <motion.div
                                key={j}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: j * 0.05 }}
                                className="flex items-center gap-2 text-xs text-muted-foreground"
                              >
                                <span className="w-1 h-1 rounded-full bg-sohub-orange shrink-0" />
                                {m}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
