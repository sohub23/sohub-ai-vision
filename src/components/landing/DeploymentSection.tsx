import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { Server, Camera, Cpu, MonitorSpeaker, Layers, Zap, Box, Settings } from "lucide-react";
import aiEngineImg from "@/assets/ai_engine.png";
import aiCameraImg from "@/assets/ai-vision-4p-2.png";

const DeploymentSection = () => (
  <section id="deployment" className="py-20 md:py-28 relative">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

    <div className="container mx-auto px-6">
      <ScrollReveal>
        <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-sohub-orange mb-4">Deployment</p>
        <h2 className="text-section-mobile md:text-[3rem] text-center text-foreground mb-4 font-extrabold leading-tight">
          Two ways to add intelligence.
        </h2>
        <p className="text-center text-muted-foreground text-body-lg max-w-xl mx-auto mb-10">
          Choose the deployment model that fits your infrastructure.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Edge Engine Card */}
        <ScrollReveal delay={0.1}>
          <motion.a
            href="/products/edge-engine"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="group relative flex flex-col h-full rounded-2xl border border-border/80 bg-background hover:border-sohub-orange/25 shadow-[0_1px_3px_0_hsl(0,0%,0%,0.04)] hover:shadow-[0_16px_40px_-8px_hsl(0,0%,0%,0.08)] transition-all duration-300 overflow-hidden"
          >
            {/* Visual Section */}
            <div className="w-full aspect-[6/3] relative overflow-hidden border-b border-border/40 bg-secondary/10">
              <img src={aiEngineImg} alt="SOHUB AI Vision Edge Engine" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="relative p-6 flex-1 flex flex-col">
              {/* Badge + Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-sohub-orange/[0.08] flex items-center justify-center group-hover:bg-sohub-orange/[0.12] transition-colors">
                  <Server className="w-4 h-4 text-sohub-orange" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Edge Engine</h3>
                  <span className="text-xs text-muted-foreground">Centralized processing</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 text-sm text-muted-foreground mb-6">
                {[
                  { icon: <Layers className="w-3.5 h-3.5" />, text: "4-8+ channels" },
                  { icon: <MonitorSpeaker className="w-3.5 h-3.5" />, text: "Existing IP cameras" },
                  { icon: <Cpu className="w-3.5 h-3.5" />, text: "LAN processing" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 group-hover:text-foreground transition-colors">
                    <span className="text-sohub-orange/50 group-hover:text-sohub-orange transition-colors">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-xs text-muted-foreground">From</span>
                <span className="text-2xl font-extrabold text-foreground">95,000 BDT</span>
              </div>

              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sohub-orange group-hover:gap-2.5 transition-all duration-300">
                View Product <span className="text-base">→</span>
              </span>
            </div>
          </motion.a>
        </ScrollReveal>

        {/* AI Camera Card */}
        <ScrollReveal delay={0.2}>
          <motion.a
            href="/products/standalone-camera"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="group relative flex flex-col h-full rounded-2xl border border-border/80 bg-background hover:border-sohub-orange/25 shadow-[0_1px_3px_0_hsl(0,0%,0%,0.04)] hover:shadow-[0_16px_40px_-8px_hsl(0,0%,0%,0.08)] transition-all duration-300"
          >
            {/* Visual Section */}
            <div className="w-full aspect-[6/3] relative border-b border-border/40 bg-secondary/10 p-2 rounded-t-[15px] overflow-hidden">
              <img src={aiCameraImg} alt="SOHUB Vision AI Camera" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-t-[13px]" />
            </div>

            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-1.5 right-6 z-20 px-3 py-1 rounded-full bg-[#0DC7FF] text-white text-[9px] font-bold tracking-widest uppercase shadow-[0_6px_16px_-3px_rgba(13,199,255,0.4)] border border-white/20"
            >
              Plug & Play
            </motion.div>

            <div className="relative p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-sohub-orange/[0.08] flex items-center justify-center group-hover:bg-sohub-orange/[0.12] transition-colors">
                  <Camera className="w-4 h-4 text-sohub-orange" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">AI Camera</h3>
                  <span className="text-xs text-muted-foreground">Built-in intelligence</span>
                </div>
              </div>

              <ul className="space-y-2.5 text-sm text-muted-foreground mb-6">
                {[
                  { icon: <Cpu className="w-3.5 h-3.5" />, text: "AI built-in" },
                  { icon: <Box className="w-3.5 h-3.5" />, text: "No external box" },
                  { icon: <Zap className="w-3.5 h-3.5" />, text: "Safety models" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 group-hover:text-foreground transition-colors">
                    <span className="text-sohub-orange/50 group-hover:text-sohub-orange transition-colors">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-xs text-muted-foreground">From</span>
                <span className="text-2xl font-extrabold text-foreground">12,500 BDT</span>
              </div>

              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sohub-orange group-hover:gap-2.5 transition-all duration-300">
                View Product <span className="text-base">→</span>
              </span>
            </div>
          </motion.a>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default DeploymentSection;
