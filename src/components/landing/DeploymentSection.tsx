import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { Server, Camera, Cpu, MonitorSpeaker, Layers, Zap, Box, Settings } from "lucide-react";
import aiEngineImg from "@/assets/ai_engine.png";
import aiCameraImg from "@/assets/ai-vision-4p.png";

const DeploymentSection = () => (
  <section id="deployment" className="py-28 md:py-36 relative">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

    <div className="container mx-auto px-6">
      <ScrollReveal>
        <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-sohub-orange mb-5">Deployment</p>
        <h2 className="text-section-mobile md:text-[3.25rem] text-center text-foreground mb-5 font-extrabold leading-tight">
          Two ways to add intelligence.
        </h2>
        <p className="text-center text-muted-foreground text-body-lg max-w-xl mx-auto mb-20">
          Choose the deployment model that fits your infrastructure.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Edge Engine Card */}
        <ScrollReveal delay={0.1}>
          <motion.a
            href="/products/edge-engine"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="group relative flex flex-col h-full rounded-3xl border border-border/80 bg-background hover:border-sohub-orange/25 shadow-[0_1px_3px_0_hsl(0,0%,0%,0.04)] hover:shadow-[0_20px_50px_-12px_hsl(0,0%,0%,0.08)] transition-all duration-300 overflow-hidden"
          >
            {/* Full Width Visual Section */}
            <div className="w-full aspect-[4/3] relative overflow-hidden border-b border-border/40 bg-secondary/10">
              <img src={aiEngineImg} alt="SOHUB AI Vision Edge Engine" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="relative p-8 md:p-10 flex-1 flex flex-col">
              {/* Subtle corner gradient */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-sohub-orange/[0.04] to-transparent rounded-bl-[80px] pointer-events-none" />

              {/* Badge + Title */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-sohub-orange/[0.08] flex items-center justify-center group-hover:bg-sohub-orange/[0.12] transition-colors">
                  <Server className="w-5 h-5 text-sohub-orange" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">SOHUB AI Vision Edge Engine</h3>
                  <span className="text-xs text-muted-foreground">Centralized processing unit</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3.5 text-sm text-muted-foreground mb-8">
                {[
                  { icon: <Layers className="w-4 h-4" />, text: "4 / 8 / scalable channels" },
                  { icon: <MonitorSpeaker className="w-4 h-4" />, text: "Works with existing IP cameras" },
                  { icon: <Cpu className="w-4 h-4" />, text: "Centralized LAN processing" },
                  { icon: <Settings className="w-4 h-4" />, text: "Flexible model deployment" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 group-hover:text-foreground transition-colors">
                    <span className="text-sohub-orange/50 group-hover:text-sohub-orange transition-colors">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-sm text-muted-foreground">Starting from</span>
                <span className="text-3xl font-extrabold text-foreground">95,000 BDT</span>
              </div>

              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sohub-orange group-hover:gap-3 transition-all duration-300">
                View Product <span className="text-lg">→</span>
              </span>
            </div>
          </motion.a>
        </ScrollReveal>

        {/* AI Camera Card */}
        <ScrollReveal delay={0.2}>
          <motion.a
            href="/products/standalone-camera"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="group relative flex flex-col h-full rounded-3xl border border-border/80 bg-background hover:border-sohub-orange/25 shadow-[0_1px_3px_0_hsl(0,0%,0%,0.04)] hover:shadow-[0_20px_50px_-12px_hsl(0,0%,0%,0.08)] transition-all duration-300"
          >
            {/* Full Width Visual Section */}
            <div className="w-full aspect-[4/3] relative border-b border-border/40 bg-secondary/10 p-2">
              <img src={aiCameraImg} alt="SOHUB Vision AI Camera" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-t-[22px]" />
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 right-8 z-20 px-4 py-1.5 rounded-full bg-[#0DC7FF] text-white text-[10px] font-bold tracking-widest uppercase shadow-[0_8px_20px_-4px_rgba(13,199,255,0.4)] border border-white/20"
              >
                Plug & Play
              </motion.div>
            </div>

            <div className="relative p-8 md:p-10 flex-1 flex flex-col">
              {/* Subtle corner gradient */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-sohub-orange/[0.04] to-transparent rounded-bl-[80px] pointer-events-none" />

              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-sohub-orange/[0.08] flex items-center justify-center group-hover:bg-sohub-orange/[0.12] transition-colors">
                  <Camera className="w-5 h-5 text-sohub-orange" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">SOHUB Vision AI Camera</h3>
                  <span className="text-xs text-muted-foreground">Built-in intelligence</span>
                </div>
              </div>

              <ul className="space-y-3.5 text-sm text-muted-foreground mb-8">
                {[
                  { icon: <Cpu className="w-4 h-4" />, text: "AI built into camera" },
                  { icon: <Box className="w-4 h-4" />, text: "No external box needed" },
                  { icon: <Zap className="w-4 h-4" />, text: "Essential safety models" },
                  { icon: <Settings className="w-4 h-4" />, text: "Quick installation" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 group-hover:text-foreground transition-colors">
                    <span className="text-sohub-orange/50 group-hover:text-sohub-orange transition-colors">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>

              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-sm text-muted-foreground">Starting from</span>
                <span className="text-3xl font-extrabold text-foreground">12,500 BDT</span>
              </div>

              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sohub-orange group-hover:gap-3 transition-all duration-300">
                View Product <span className="text-lg">→</span>
              </span>
            </div>
          </motion.a>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default DeploymentSection;
