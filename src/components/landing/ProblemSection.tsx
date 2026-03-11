import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { Video, DollarSign, Wifi } from "lucide-react";

const problems = [
  { icon: <Video className="w-6 h-6" />, title: "Reactive, not preventive", text: "Footage is reviewed after incidents. By then, damage is done." },
  { icon: <DollarSign className="w-6 h-6" />, title: "Expensive to scale", text: "Cloud AI subscriptions multiply with every camera added." },
  { icon: <Wifi className="w-6 h-6" />, title: "Internet-dependent", text: "Cloud solutions fail where connectivity is unreliable." },
];

const ProblemSection = () => (
  <section id="problem" className="py-28 md:py-36 bg-sohub-gray-50 relative">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    
    <div className="container mx-auto px-6">
      <ScrollReveal>
        <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-sohub-orange mb-5">The Problem</p>
        <h2 className="text-section-mobile md:text-section text-center text-foreground mb-5 font-extrabold leading-tight">
          CCTV records. It doesn't prevent.
        </h2>
        <p className="text-center text-muted-foreground text-body-lg max-w-xl mx-auto mb-20">
          Millions of cameras installed. Same blind spots in response.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-20">
        {problems.map((p, i) => (
          <ScrollReveal key={i} delay={i * 0.12}>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative p-8 md:p-10 rounded-3xl bg-background border border-border/80 hover:border-sohub-orange/25 shadow-[0_1px_3px_0_hsl(0,0%,0%,0.04)] hover:shadow-[0_20px_50px_-12px_hsl(0,0%,0%,0.08)] transition-all duration-300 group overflow-hidden"
            >
              {/* Large watermark number */}
              <span className="absolute -top-2 -right-1 text-[7rem] font-black text-foreground/[0.03] select-none leading-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              
              {/* Icon */}
              <motion.div
                whileInView={{ scale: [0.5, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1, type: "spring" }}
                className="w-14 h-14 rounded-2xl bg-sohub-orange/[0.07] flex items-center justify-center text-sohub-orange mb-6 group-hover:bg-sohub-orange/[0.12] group-hover:shadow-[0_4px_16px_-4px_hsl(199,100%,50%,0.2)] transition-all duration-300"
              >
                {p.icon}
              </motion.div>

              <h3 className="text-xl font-bold text-foreground mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="max-w-lg mx-auto text-center">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="inline-block px-10 py-7 rounded-3xl bg-gradient-to-br from-foreground/[0.02] via-sohub-orange/[0.03] to-transparent border border-border/50 shadow-sm"
          >
            <p className="text-lg md:text-xl text-foreground font-semibold leading-relaxed">
              Bangladesh doesn't need more cameras.
              <br />
              It needs <span className="text-sohub-orange">earlier decisions</span>.
            </p>
          </motion.div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default ProblemSection;
