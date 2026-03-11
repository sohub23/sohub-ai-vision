import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { Link2, SlidersHorizontal, BellRing } from "lucide-react";

const steps = [
  { icon: <Link2 className="w-6 h-6" />, num: "01", title: "Connect cameras", desc: "Link your existing IP cameras to the SOHUB engine via LAN." },
  { icon: <SlidersHorizontal className="w-6 h-6" />, num: "02", title: "Select models & thresholds", desc: "Choose detection models and configure sensitivity for your environment." },
  { icon: <BellRing className="w-6 h-6" />, num: "03", title: "Receive alerts & trigger actions", desc: "Get instant notifications and automate responses." },
];

const badges = ["Webhook", "MQTT", "Alarm", "Announcement", "Snapshot"];

const HowItWorksSection = () => (
  <section className="py-28 md:py-36 bg-sohub-gray-50 relative">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    
    <div className="container mx-auto px-6">
      <ScrollReveal>
        <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-sohub-orange mb-5">How It Works</p>
        <h2 className="text-section-mobile md:text-section text-center text-foreground mb-4 font-extrabold leading-tight">
          Simple. Local. Reliable.
        </h2>
        <p className="text-center text-muted-foreground text-body-lg max-w-md mx-auto mb-20">
          Three steps to transform your cameras into an intelligent system.
        </p>
      </ScrollReveal>

      <div className="relative max-w-5xl mx-auto mb-20">
        {/* Timeline connector - horizontal line between icons */}
        <div className="hidden md:block absolute top-[44px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-[3px]">
          <div className="h-full bg-border/60 rounded-full overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-sohub-orange/50 via-sohub-orange to-sohub-orange/50 origin-left"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative z-10">
          {steps.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.18}>
              <motion.div whileHover={{ y: -6 }} className="text-center group">
                {/* Icon circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.18, type: "spring", stiffness: 200 }}
                  className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-sohub-orange/10 to-sohub-orange/5 border-2 border-sohub-orange/25 flex items-center justify-center mx-auto mb-6 shadow-[0_4px_20px_-4px_hsl(199,100%,50%,0.15)] group-hover:border-sohub-orange/40 group-hover:shadow-[0_8px_30px_-6px_hsl(199,100%,50%,0.25)] transition-all duration-300"
                >
                  <span className="text-sohub-orange">{s.icon}</span>
                </motion.div>

                {/* Step number */}
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-sohub-orange/60 mb-3 block">{s.num}</span>
                
                <h3 className="text-lg font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px] mx-auto">{s.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <ScrollReveal>
        <p className="text-center text-xs font-semibold text-muted-foreground mb-5 tracking-[0.15em] uppercase">Integration options</p>
        <div className="flex flex-wrap justify-center gap-3">
          {badges.map((b, i) => (
            <motion.span
              key={b}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.5 + i * 0.07 }}
              whileHover={{ scale: 1.06, y: -2 }}
              className="px-5 py-2.5 rounded-full bg-background border border-border text-xs font-semibold text-muted-foreground shadow-sm hover:border-sohub-orange/25 hover:text-foreground hover:shadow-md transition-all duration-200"
            >
              {b}
            </motion.span>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default HowItWorksSection;
