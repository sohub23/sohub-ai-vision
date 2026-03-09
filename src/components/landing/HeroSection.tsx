import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Camera, Cpu, Bell, Image, Radio, Webhook } from "lucide-react";
import heroImage from "@/assets/sohub-vision-hero.png";

const HeroSection = () => (
  <section className="relative pt-20 pb-8 md:pt-28 md:pb-12 overflow-hidden">
    <SurveillanceBackground />

    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sohub-orange/8 border border-sohub-orange/15 mt-12 mb-12"
        >
          <span className="w-2 h-2 rounded-full bg-sohub-orange animate-pulse" />
          <span className="text-xs font-medium tracking-wide text-sohub-orange uppercase">SOHUB AI Vision · Made for Bangladesh</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[1.75rem] md:text-[2.5rem] leading-[1.1] font-extrabold tracking-tight text-foreground mb-4"
        >
          Your cameras already see.
          <br />
          <span className="bg-gradient-to-r from-sohub-orange to-[hsl(189,100%,55%)] bg-clip-text text-transparent">
            Now they can understand.
          </span>
        </motion.h1>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-2"
        >
          <img src={heroImage} alt="SOHUB AI Vision system with cameras and edge engine detecting falls, intrusions and fire" className="w-full h-auto rounded-2xl -my-4 md:-my-6" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-5 leading-relaxed md:whitespace-nowrap"
        >
          Real-time AI for your existing cameras — fully offline, no cloud, no subscriptions.
        </motion.p>

        {/* Starting Price + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-16"
        >
          <div className="flex items-center gap-1">
            <span className="text-[10px] sm:text-xs text-muted-foreground">Starting from</span>
            <span className="text-lg sm:text-xl font-extrabold text-foreground">12,500 BDT</span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground">/unit</span>
          </div>
          <a href="#deployment">
            <Button variant="hero" size="default" className="rounded-xl text-xs sm:text-sm px-6 py-4 sm:px-8 sm:py-5 shadow-[0_8px_30px_-6px_hsl(199,100%,50%,0.4)]">
              Deployment
            </Button>
          </a>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="relative max-w-3xl mx-auto"
        >
          {/* Glow behind diagram */}
          <div className="absolute inset-0 bg-gradient-to-b from-sohub-orange/5 to-transparent rounded-3xl blur-2xl" />

          <div className="relative bg-background/60 backdrop-blur-sm border border-border/60 rounded-2xl p-8 md:p-10">
            {/* Flow label */}
            <div className="flex items-center justify-center gap-3 mb-8">
              {["CCTV Feed", "AI Processing", "Instant Response"].map((label, i) => (
                <div key={label} className="flex items-center gap-3">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + i * 0.15 }}
                    className={`text-xs font-semibold tracking-wide uppercase ${i === 2 ? "text-sohub-orange" : "text-muted-foreground"
                      }`}
                  >
                    {label}
                  </motion.span>
                  {i < 2 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.9 + i * 0.15 }}
                      className="origin-left"
                    >
                      <svg width="24" height="8" viewBox="0 0 24 8" className="text-border">
                        <path d="M0 4H20M20 4L16 1M20 4L16 7" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Diagram nodes */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              <DiagramNode icon={<Camera className="w-5 h-5" />} label="IP Cameras" sublabel="ONVIF / RTSP" />
              <AnimatedArrow />
              <DiagramNode icon={<Cpu className="w-5 h-5" />} label="SOHUB AI Vision Engine" sublabel="Edge Processing" highlight />
              <AnimatedArrow />
              <div className="flex flex-wrap justify-center gap-2">
                <OutputBadge icon={<Bell className="w-3.5 h-3.5" />} label="Alert" />
                <OutputBadge icon={<Image className="w-3.5 h-3.5" />} label="Snapshot" />
                <OutputBadge icon={<Radio className="w-3.5 h-3.5" />} label="Alarm" />
                <OutputBadge icon={<Webhook className="w-3.5 h-3.5" />} label="Webhook" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

/* Surveillance-themed animated background */
const SurveillanceBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-sohub-orange/[0.02] via-transparent to-background" />

    <svg className="absolute inset-0 w-full h-full opacity-[0.25]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid)" />
    </svg>

    {/* Static ambient glow instead of animated blobs */}
    <div className="absolute top-16 right-[15%] w-[400px] h-[400px] rounded-full bg-sohub-orange/[0.03] blur-[80px]" />
    <div className="absolute bottom-10 left-[5%] w-[500px] h-[500px] rounded-full bg-sohub-orange/[0.02] blur-[100px]" />
  </div>
);

const DiagramNode = ({ icon, label, sublabel, highlight = false }: { icon: React.ReactNode; label: string; sublabel: string; highlight?: boolean }) => (
  <motion.div
    whileHover={{ scale: 1.04, y: -2 }}
    className={`flex flex-col items-center gap-1.5 px-6 py-5 rounded-xl border transition-all duration-200 ${highlight
      ? "border-sohub-orange/30 bg-gradient-to-b from-sohub-orange/8 to-sohub-orange/3 shadow-[0_4px_20px_-4px_hsl(199,100%,50%,0.15)]"
      : "border-border bg-secondary/40"
      }`}
  >
    <div className={`p-2 rounded-lg ${highlight ? "bg-sohub-orange/10 text-sohub-orange" : "bg-secondary text-muted-foreground"}`}>
      {icon}
    </div>
    <span className="text-sm font-semibold text-foreground">{label}</span>
    <span className="text-[10px] text-muted-foreground">{sublabel}</span>
  </motion.div>
);

const OutputBadge = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <motion.div
    whileHover={{ scale: 1.06, y: -1 }}
    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary/50 border border-border text-xs font-medium text-muted-foreground"
  >
    {icon}
    {label}
  </motion.div>
);

const AnimatedArrow = () => (
  <>
    {/* Horizontal arrow - desktop */}
    <div className="text-border hidden md:block">
      <motion.svg
        width="40"
        height="12"
        viewBox="0 0 40 12"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.path
          d="M0 6H36M36 6L30 1M36 6L30 11"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
      </motion.svg>
    </div>
    {/* Vertical arrow - mobile */}
    <div className="text-border md:hidden">
      <motion.svg
        width="12"
        height="28"
        viewBox="0 0 12 28"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.path
          d="M6 0V24M6 24L1 18M6 24L11 18"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
      </motion.svg>
    </div>
  </>
);

export default HeroSection;
