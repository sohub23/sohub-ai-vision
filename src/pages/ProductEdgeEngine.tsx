import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Server, Layers, MonitorSpeaker, Cpu, Settings, Shield, Zap, ChevronDown, Check, Plus, ArrowLeft, Wifi, WifiOff, HardDrive, Network, Clock, Activity, BadgeCheck, ShoppingBag, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const specs = [
  { label: "Channels", value: "4 / 8 / scalable" },
  { label: "Processing", value: "Edge GPU (NVIDIA)" },
  { label: "Connectivity", value: "LAN / ONVIF / RTSP" },
  { label: "Power", value: "12V DC / PoE" },
  { label: "Form Factor", value: "Compact 1U rack-mount or desktop" },
  { label: "Storage", value: "Local NVR + optional NAS" },
  { label: "AI Models", value: "20+ detection models" },
  { label: "Latency", value: "< 200ms real-time" },
];

const benefits = [
  { icon: <Layers className="w-5 h-5" />, title: "Multi-Camera Processing", desc: "Process 4 to 8+ cameras simultaneously from a single device." },
  { icon: <MonitorSpeaker className="w-5 h-5" />, title: "Works With Existing Cameras", desc: "No need to replace your current CCTV — just plug in via LAN." },
  { icon: <Shield className="w-5 h-5" />, title: "100% Offline & Private", desc: "All processing stays on your network. Zero cloud dependency." },
  { icon: <Cpu className="w-5 h-5" />, title: "Flexible Model Deployment", desc: "Choose and swap AI models based on your environment." },
  { icon: <Zap className="w-5 h-5" />, title: "Instant Alerts", desc: "Real-time notifications via webhook, alarm, or app." },
  { icon: <Settings className="w-5 h-5" />, title: "Remote Management", desc: "Configure and monitor from any device on your network." },
];

const addOns = [
  { id: "install", name: "Professional Installation", priceStr: "৳5,000", price: 5000, desc: "On-site setup and camera configuration" },
  { id: "training", name: "On-Site Training", priceStr: "৳3,000", price: 3000, desc: "Staff training on dashboard and alerts" },
  { id: "warranty", name: "Extended Warranty", priceStr: "৳8,000/yr", price: 8000, desc: "Additional 1-year hardware warranty" },
  { id: "support", name: "Priority Support", priceStr: "৳5,000/yr", price: 5000, desc: "Dedicated support line and 4-hour response" },
];

const faqs = [
  { q: "How many cameras can the Edge Engine support?", a: "The base model supports 4 channels. We also offer 8-channel and scalable options for larger deployments." },
  { q: "Does it work with my existing cameras?", a: "Yes — any IP camera supporting ONVIF or RTSP protocol is compatible." },
  { q: "Is internet required?", a: "No. The Edge Engine runs 100% offline on your local network." },
  { q: "What happens if I want to add more cameras later?", a: "You can upgrade to a higher-channel model or add additional Edge Engine units." },
];

const videos = [
  { id: "rSQWDez6wbA", title: "Edge Engine Live Demo" },
];

const trustPoints = [
  { icon: <WifiOff className="w-4 h-4" />, label: "100% Offline" },
  { icon: <Shield className="w-4 h-4" />, label: "Data Stays Local" },
  { icon: <Clock className="w-4 h-4" />, label: "< 200ms Latency" },
  { icon: <BadgeCheck className="w-4 h-4" />, label: "1 Year Warranty" },
];

const highlights = [
  { num: "20+", label: "AI Models" },
  { num: "4-8+", label: "Camera Channels" },
  { num: "<200", label: "ms Latency" },
  { num: "0", label: "Cloud Fees" },
];

const ProductEdgeEngine = () => {
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedTier, setSelectedTier] = useState(0);
  const [step, setStep] = useState<"configure" | "checkout">("configure");
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", location: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const tiers = [
    { channels: "4 Channels", priceStr: "৳95,000", price: 95000, desc: "Ideal for small setups — shops, clinics, offices" },
    { channels: "8 Channels", priceStr: "৳1,50,000", price: 150000, desc: "For mid-size deployments — warehouses, schools, factories" },
    { channels: "8+ Channels", priceStr: null, price: 0, desc: "Custom configuration for large-scale or enterprise needs" },
  ];

  const formatPrice = (n: number) => `৳${n.toLocaleString("en-BD")}`;

  const toggleAddOn = (i: number) => {
    setSelectedAddOns(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  const basePrice = tiers[selectedTier].price;
  const addOnTotal = selectedAddOns.reduce((sum, idx) => sum + addOns[idx].price, 0);
  const totalPrice = basePrice + addOnTotal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const currentTier = tiers[selectedTier];
    const selectedAddOnNames = selectedAddOns.map(idx => addOns[idx].name);

    // Determine if this is a custom request (8+ Channels)
    const isCustom = selectedTier === 2;

    try {
      // Using the absolute URL to target the remote environment as XAMPP is not installed locally
      const response = await fetch("/server-api/send-ai-order.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          productType: isCustom ? "edge-engine-custom" : "edge-engine",
          machineType: `AI Vision Edge Engine — ${currentTier.channels}`,
          unitPrice: isCustom ? 0 : currentTier.price,
          quantity: 1,
          addOns: selectedAddOnNames,
          totalPrice: isCustom ? 0 : totalPrice,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setStep("configure");
          setForm({ name: "", company: "", phone: "", email: "", location: "", notes: "" });
          setSelectedAddOns([]);
          setSelectedTier(0);
        }, 5000);
      } else {
        alert("Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="SOHUB AI Vision Edge Engine – Centralized AI for CCTV | From ৳95,000"
        description="Process 4-8+ cameras with one device. NVIDIA GPU-powered edge AI for your existing CCTV network. 100% offline, no cloud fees. Starting from ৳95,000."
        path="/products/edge-engine"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-sohub-orange/[0.02] via-transparent to-background" />
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-sohub-orange/[0.03] blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sohub-orange/[0.07] border border-sohub-orange/15 text-xs font-semibold text-sohub-orange uppercase tracking-[0.15em] mb-8">
                <Server className="w-3.5 h-3.5" /> Edge Processing Unit
              </span>
              <h1 className="text-4xl md:text-[3.5rem] font-extrabold tracking-tight text-foreground mb-5 leading-[1.08]">
                SOHUB AI Vision
                <br />
                <span className="bg-gradient-to-r from-sohub-orange to-[hsl(189,100%,55%)] bg-clip-text text-transparent">Edge Engine</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                Centralized AI processing for your existing CCTV cameras. Add intelligence to your entire surveillance network — offline, on your own terms.
              </p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Starting from</span>
                <span className="text-4xl md:text-5xl font-extrabold text-foreground">৳95,000</span>
              </div>

              {/* Trust points */}
              <div className="flex flex-wrap gap-3 mb-10">
                {trustPoints.map((t, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/60 border border-border/60 text-xs font-medium text-muted-foreground"
                  >
                    <span className="text-sohub-orange">{t.icon}</span>
                    {t.label}
                  </motion.span>
                ))}
              </div>

              <Button variant="hero" size="lg" className="rounded-xl text-base px-10 py-6 shadow-[0_8px_30px_-6px_hsl(199,100%,50%,0.4)]">
                Request a Quote
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-md relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-sohub-orange/[0.06] to-transparent rounded-3xl blur-2xl scale-110" />
                <div className="relative p-10 rounded-3xl border border-border/60 bg-gradient-to-br from-background via-secondary/30 to-secondary/10 shadow-[0_20px_60px_-15px_hsl(0,0%,0%,0.06)]">
                  <EdgeEngineSVGLarge />
                  {/* Floating label */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-sohub-orange text-primary-foreground text-[10px] font-bold tracking-wide uppercase shadow-lg"
                  >
                    GPU Powered
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-10 border-y border-border/60 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <span className="text-3xl md:text-4xl font-extrabold text-foreground">{h.num}</span>
                <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wider">{h.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it connects - Visual diagram */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-sohub-orange mb-5">Architecture</p>
            <h2 className="text-section-mobile md:text-[3rem] text-center text-foreground mb-5 font-extrabold">How It Connects</h2>
            <p className="text-center text-muted-foreground text-body-lg mb-16 max-w-lg mx-auto">One device processes your entire camera network locally.</p>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <div className="relative p-8 md:p-12 rounded-3xl border border-border/60 bg-gradient-to-br from-secondary/20 to-transparent">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
                {/* Cameras */}
                <div className="flex flex-col gap-3">
                  {["Camera 1", "Camera 2", "Camera 3", "Camera 4"].map((cam, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-border/80 shadow-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500/60" />
                      <span className="text-xs font-medium text-foreground">{cam}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Arrow */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="origin-left hidden md:block"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-[2px] bg-gradient-to-r from-border to-sohub-orange/40" />
                    <Network className="w-4 h-4 text-sohub-orange/60" />
                    <div className="w-16 h-[2px] bg-gradient-to-r from-sohub-orange/40 to-border" />
                  </div>
                  <p className="text-[10px] text-muted-foreground text-center mt-1">LAN</p>
                </motion.div>

                {/* Mobile arrow */}
                <div className="md:hidden text-muted-foreground">
                  <svg width="12" height="28" viewBox="0 0 12 28"><path d="M6 0V24M6 24L1 18M6 24L11 18" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
                </div>

                {/* Engine */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="px-8 py-6 rounded-2xl border-2 border-sohub-orange/30 bg-gradient-to-b from-sohub-orange/[0.06] to-transparent shadow-[0_8px_30px_-6px_hsl(199,100%,50%,0.1)]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Server className="w-5 h-5 text-sohub-orange" />
                    <span className="text-sm font-bold text-foreground">Edge Engine</span>
                  </div>
                  <div className="flex gap-1.5 mt-3">
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 rounded-full bg-sohub-orange" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="w-2 h-2 rounded-full bg-green-500" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/20" />
                  </div>
                </motion.div>

                {/* Arrow */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="origin-left hidden md:block"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-[2px] bg-gradient-to-r from-border to-sohub-orange/40" />
                    <Activity className="w-4 h-4 text-sohub-orange/60" />
                  </div>
                </motion.div>

                <div className="md:hidden text-muted-foreground">
                  <svg width="12" height="28" viewBox="0 0 12 28"><path d="M6 0V24M6 24L1 18M6 24L11 18" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
                </div>

                {/* Outputs */}
                <div className="flex flex-col gap-3">
                  {["Alert", "Snapshot", "Alarm", "Webhook"].map((out, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 + i * 0.08 }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-border/80 shadow-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-sohub-orange/50" />
                      <span className="text-xs font-medium text-foreground">{out}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 md:py-32 bg-sohub-gray-50">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-sohub-orange mb-5">Benefits</p>
            <h2 className="text-section-mobile md:text-[3rem] text-center text-foreground mb-5 font-extrabold">Why Edge Engine?</h2>
            <p className="text-center text-muted-foreground text-body-lg mb-20 max-w-xl mx-auto">Purpose-built for centralized, multi-camera AI processing.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="p-7 rounded-2xl border border-border/80 bg-background hover:border-sohub-orange/25 hover:shadow-[0_12px_40px_-10px_hsl(0,0%,0%,0.06)] transition-all duration-300 group h-full"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sohub-orange/[0.07] flex items-center justify-center text-sohub-orange mb-5 group-hover:bg-sohub-orange/[0.12] group-hover:shadow-[0_4px_16px_-4px_hsl(199,100%,50%,0.15)] transition-all duration-300">{b.icon}</div>
                  <h3 className="font-bold text-foreground mb-2 text-[15px]">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-sohub-orange mb-5">Specs</p>
            <h2 className="text-section-mobile md:text-[3rem] text-center text-foreground mb-20 font-extrabold">Technical Specifications</h2>
          </ScrollReveal>
          <div className="max-w-2xl mx-auto bg-background rounded-3xl border border-border/80 overflow-hidden shadow-[0_4px_20px_-8px_hsl(0,0%,0%,0.05)]">
            {specs.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`flex justify-between items-center py-5 px-7 ${i < specs.length - 1 ? "border-b border-border/50" : ""} ${i % 2 === 0 ? "bg-secondary/15" : ""}`}
              >
                <span className="text-sm font-semibold text-foreground">{s.label}</span>
                <span className="text-sm text-muted-foreground font-medium">{s.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      {videos.length > 0 && (
        <section className="py-24 md:py-32 bg-sohub-gray-50">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-sohub-orange mb-5">Demo</p>
              <h2 className="text-section-mobile md:text-[3rem] text-center text-foreground mb-16 font-extrabold">See It In Action</h2>
            </ScrollReveal>
            <div className="max-w-3xl mx-auto">
              {videos.map(v => (
                <div key={v.id} className="rounded-3xl overflow-hidden border border-border shadow-[0_20px_60px_-15px_hsl(0,0%,0%,0.08)]">
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1&loop=1&playlist=${v.id}`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Checkout / Pricing */}
      <section className="py-24 md:py-32" id="order-section">
        <div className="container mx-auto px-6 max-w-6xl">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-sohub-orange mb-4">Order</p>
              <h2 className="text-section-mobile md:text-[3rem] text-center text-foreground mb-4 font-extrabold">Configure Your Order</h2>
              <p className="text-center text-muted-foreground text-body-lg max-w-xl mx-auto">Select your configuration and submit an order request.</p>
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            {!submitted && step === "configure" && (
              <motion.div key="configure" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Left: Options */}
                  <div className="lg:col-span-3 space-y-8">
                    {/* Tier selection */}
                    <div>
                      <h3 className="font-bold text-lg mb-4 text-foreground">Channels</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {tiers.map((tier, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ y: -2 }}
                            onClick={() => {
                              setSelectedTier(i);
                              if (i === 2) setStep("checkout");
                            }}
                            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 text-center ${selectedTier === i
                              ? "border-sohub-orange/40 bg-gradient-to-b from-sohub-orange/[0.06] to-transparent shadow-sm"
                              : "border-border bg-background hover:border-sohub-orange/20"
                              }`}
                          >
                            <div className={`w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center ${selectedTier === i ? "bg-sohub-orange/10 text-sohub-orange" : "bg-secondary text-muted-foreground"
                              }`}>
                              <Server className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-foreground text-sm mb-1">{tier.channels}</h4>
                            {tier.priceStr ? (
                              <span className="text-xl font-extrabold text-foreground">{tier.priceStr}</span>
                            ) : (
                              <span className="text-sm font-semibold text-sohub-orange">Contact Us</span>
                            )}
                            <p className="text-[11px] text-muted-foreground mt-2 leading-snug">{tier.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Add-ons */}
                    <div>
                      <h3 className="font-bold text-lg mb-4 text-foreground">Customize with Add-Ons</h3>
                      <div className="space-y-3">
                        {addOns.map((addon, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ y: -2 }}
                            onClick={() => toggleAddOn(i)}
                            className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 ${selectedAddOns.includes(i)
                              ? "border-sohub-orange/40 bg-sohub-orange/[0.04] shadow-sm"
                              : "border-border bg-background hover:border-sohub-orange/20"
                              }`}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${selectedAddOns.includes(i) ? "bg-sohub-orange border-sohub-orange" : "border-border"
                                  }`}>
                                  {selectedAddOns.includes(i) ? <Check className="w-4 h-4 text-primary-foreground" /> : <Plus className="w-3 h-3 text-muted-foreground" />}
                                </div>
                                <div>
                                  <span className="text-sm font-semibold text-foreground">{addon.name}</span>
                                  <p className="text-xs text-muted-foreground mt-0.5">{addon.desc}</p>
                                </div>
                              </div>
                              <span className="text-sm font-bold text-foreground whitespace-nowrap ml-4">{addon.priceStr}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Summary */}
                  <div className="lg:col-span-2">
                    <div className="sticky top-28 p-6 md:p-8 rounded-[2rem] border border-border bg-secondary/10 shadow-[0_20px_40px_-15px_hsl(0,0%,0%,0.05)] space-y-6">
                      <h3 className="font-bold text-xl text-foreground">Order Summary</h3>

                      <div className="space-y-3 pb-6 border-b border-border/60">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-foreground">AI Edge Engine</p>
                            <p className="text-sm text-muted-foreground">{tiers[selectedTier].channels}</p>
                          </div>
                          <span className="font-semibold text-foreground">{tiers[selectedTier].priceStr || "Custom"}</span>
                        </div>

                        {selectedAddOns.length > 0 && selectedAddOns.map(id => (
                          <div key={id} className="flex justify-between items-start">
                            <span className="text-sm text-muted-foreground">{addOns[id].name}</span>
                            <span className="font-medium text-foreground text-sm">{addOns[id].priceStr}</span>
                          </div>
                        ))}
                      </div>

                      <div>
                        <div className="flex justify-between items-end mb-2">
                          <span className="font-semibold text-foreground">Total</span>
                          <span className="text-3xl font-extrabold text-foreground">
                            {selectedTier === 2 ? "Custom" : formatPrice(totalPrice)}
                          </span>
                        </div>
                        {selectedAddOns.some(id => addOns[id].name.includes("/yr")) && (
                          <p className="text-xs text-muted-foreground text-right">* Includes yearly recurring charges</p>
                        )}
                      </div>

                      <Button onClick={() => setStep("checkout")} variant="hero" size="lg" className="w-full rounded-xl py-6 text-base group shadow-[0_8px_30px_-6px_hsl(199,100%,50%,0.4)]">
                        {selectedTier === 2 ? "Discuss Requirements" : "Continue to Order"}
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                      <p className="text-[11px] text-muted-foreground text-center">
                        This is an order request. Payment details will be confirmed separately.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {!submitted && step === "checkout" && (
              <motion.div key="checkout" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="max-w-2xl mx-auto">
                <button onClick={() => setStep("configure")} className="text-sm text-sohub-orange mb-8 hover:underline flex items-center font-medium gap-1.5 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back to Configuration
                </button>

                {/* Show Order Summary ONLY if it's not custom 8+ Channels */}
                {selectedTier !== 2 ? (
                  <div className="p-6 md:p-8 rounded-[2rem] border border-border bg-secondary/10 mb-8 max-w-2xl mx-auto shadow-sm">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-foreground"><ShoppingBag className="w-5 h-5 text-sohub-orange" /> Order Summary</h3>
                    <div className="text-sm space-y-2 text-muted-foreground">
                      <p className="font-medium text-foreground flex justify-between">
                        <span>AI Edge Engine — {tiers[selectedTier].channels}</span>
                        <span>{tiers[selectedTier].priceStr}</span>
                      </p>
                      {selectedAddOns.map(id => (
                        <p key={id} className="flex justify-between">
                          <span>+ {addOns[id].name}</span>
                          <span>{addOns[id].priceStr}</span>
                        </p>
                      ))}
                      <div className="pt-4 border-t border-border/60 mt-4 flex items-center justify-between">
                        <span className="font-bold text-foreground">Total:</span>
                        <span className="font-extrabold text-foreground text-lg">{formatPrice(totalPrice)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-8 text-center px-4">
                    <h3 className="font-bold text-2xl text-foreground mb-3">Discuss Requirements</h3>
                    <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">Please provide your details below. Our technical team will reach out to discuss your custom channel limits and deployment scope.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-[2rem] border border-border bg-background shadow-sm space-y-6">
                  <h3 className="font-bold text-xl text-foreground">Your Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-semibold mb-2 block text-foreground">Name *</label>
                      <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-sohub-orange/50 transition-all font-medium text-foreground" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block text-foreground">Company</label>
                      <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-sohub-orange/50 transition-all font-medium text-foreground" placeholder="Your Company Ltd." />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-semibold mb-2 block text-foreground">Phone *</label>
                      <input type="tel" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-sohub-orange/50 transition-all font-medium text-foreground" placeholder="+880 1..." />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block text-foreground">Email</label>
                      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-sohub-orange/50 transition-all font-medium text-foreground" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block text-foreground">Deployment Location *</label>
                    <input type="text" required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="City, area, specific location" className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-sohub-orange/50 transition-all font-medium text-foreground" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block text-foreground">{selectedTier === 2 ? 'Project Scope / Requirements *' : 'Additional Notes'}</label>
                    <textarea required={selectedTier === 2} rows={4} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Any specific requirements or questions" className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-sohub-orange/50 transition-all resize-none font-medium text-foreground" />
                  </div>
                  <div className="pt-2">
                    <Button type="submit" disabled={loading} variant="hero" size="lg" className="w-full rounded-xl py-6 shadow-[0_8px_30px_-6px_hsl(199,100%,50%,0.4)]">
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        selectedTier === 2 ? "Submit Requirements" : "Submit Order Request"
                      )}
                    </Button>
                    <p className="text-[11px] text-muted-foreground text-center mt-4">Our team will contact you within 1 business day to confirm details.</p>
                  </div>
                </form>
              </motion.div>
            )}

            {submitted && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto">
                <div className="p-10 md:p-16 rounded-[2.5rem] border border-border bg-gradient-to-b from-background to-secondary/20 shadow-sm text-center">
                  <div className="w-20 h-20 rounded-full bg-sohub-orange/10 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-sohub-orange" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold mb-4 text-foreground">Request Submitted</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">Thank you for your interest in the SOHUB AI Vision Edge Engine!</p>
                  <p className="text-sm text-muted-foreground p-4 bg-secondary/50 rounded-xl">Our team will review your configuration and contact you at <strong className="text-foreground">{form.phone || form.email}</strong> within 1 business day.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-sohub-gray-50">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-section-mobile md:text-[3rem] text-center text-foreground mb-16 font-extrabold">Frequently Asked Questions</h2>
          </ScrollReveal>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div
                  className="p-6 rounded-2xl border border-border/80 bg-background cursor-pointer hover:border-sohub-orange/20 hover:shadow-sm transition-all duration-200"
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-foreground pr-4">{faq.q}</span>
                    <motion.div animate={{ rotate: expandedFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {expandedFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <p className="text-sm text-muted-foreground mt-4 pt-4 border-t border-border/60 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const EdgeEngineSVGLarge = () => (
  <motion.svg width="100%" viewBox="0 0 200 140" fill="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
    <rect x="60" y="20" width="80" height="100" rx="8" stroke="hsl(var(--border))" strokeWidth="1.5" fill="hsl(var(--secondary))" />
    <rect x="72" y="36" width="56" height="6" rx="3" fill="hsl(var(--sohub-orange) / 0.2)" />
    <rect x="72" y="50" width="56" height="6" rx="3" fill="hsl(var(--sohub-orange) / 0.15)" />
    <rect x="72" y="64" width="56" height="6" rx="3" fill="hsl(var(--sohub-orange) / 0.1)" />
    <motion.circle cx="80" cy="96" r="3" fill="hsl(var(--sohub-orange))" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} />
    <motion.circle cx="92" cy="96" r="3" fill="hsl(142, 71%, 45%)" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
    <circle cx="104" cy="96" r="3" fill="hsl(var(--muted-foreground) / 0.2)" />
    {[[20, 40], [20, 90], [180, 40], [180, 90]].map(([x, y], i) => (
      <g key={i}>
        <line x1={x} y1={y} x2={x < 100 ? 60 : 140} y2={y < 70 ? 50 : 80} stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 3" />
        <circle cx={x} cy={y} r="6" stroke="hsl(var(--muted-foreground) / 0.3)" strokeWidth="1" fill="hsl(var(--background))" />
        <circle cx={x} cy={y} r="2" fill="hsl(var(--muted-foreground) / 0.4)" />
      </g>
    ))}
  </motion.svg>
);

export default ProductEdgeEngine;
