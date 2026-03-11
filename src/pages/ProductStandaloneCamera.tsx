import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, Cpu, Box, Zap, Shield, Settings, ChevronDown, Check, Plus, ArrowLeft, WifiOff, Clock, BadgeCheck, Eye, Thermometer, Flame, ShoppingBag, ArrowRight, Minus } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import WhatsAppChat from "@/components/WhatsAppChat";
import aiCameraImg from "@/assets/ai-vision-4p-2.png";
import aiCamera1pImg from "@/assets/ai-vision-1p.png";

const specs1Algo = [
  { label: "Image Sensor", value: "1/3\" CMOS" },
  { label: "Wide Dynamic Range", value: "≥120dB" },
  { label: "Field of View", value: "52.2°(D) / 46.2°(H) / 27°(V)" },
  { label: "Focal Length", value: "6mm (F2.0)" },
  { label: "Illumination Range", value: "30m Warm Lights" },
  { label: "Network", value: "RJ45 10M/100M + ONVIF" },
  { label: "Max Resolution", value: "4MP (2560 x 1440) @ 25fps" },
  { label: "Video Compression", value: "H.265 / H.264 / MJPEG" },
  { label: "Protection Level", value: "IP66 / 4KV Surge" },
  { label: "Operating Temp", value: "-10℃ to +60℃" },
  { label: "Power Supply", value: "DC12V-24V / POE" },
  { label: "AI Algorithms", value: "13+ Algorithms (Flexible Selection)" },
];

const specs4Algo = [
  { label: "Image Sensor", value: "1/3\" CMOS" },
  { label: "Wide Dynamic Range", value: "≥120dB" },
  { label: "Field of View", value: "52.2°(D) / 46.2°(H) / 27°(V)" },
  { label: "Focal Length", value: "6mm (F2.0)" },
  { label: "Illumination Range", value: "30m Warm Lights" },
  { label: "Network", value: "RJ45 10M/100M + ONVIF" },
  { label: "Max Resolution", value: "4MP (2560 x 1440) @ 25fps" },
  { label: "Video Compression", value: "H.265 / H.264 / MJPEG" },
  { label: "Protection Level", value: "IP66 / 4KV Surge" },
  { label: "Operating Temp", value: "-10℃ to +60℃" },
  { label: "Power Supply", value: "DC12V-24V / POE" },
  { label: "AI Algorithms", value: "13+ Algorithms (Full Suite)" },
];

const benefits = [
  { icon: <Cpu className="w-5 h-5" />, title: "AI Built Into Camera", desc: "No external box or server needed — intelligence runs on the camera itself." },
  { icon: <Box className="w-5 h-5" />, title: "Plug & Play Setup", desc: "Mount, connect, and start detecting within minutes." },
  { icon: <Shield className="w-5 h-5" />, title: "Fully Offline", desc: "No internet required. All data stays on your local network." },
  { icon: <Zap className="w-5 h-5" />, title: "Instant Alerts", desc: "Real-time push notifications and alarm triggers." },
  { icon: <Camera className="w-5 h-5" />, title: "HD Surveillance", desc: "High-definition recording with AI-powered event tagging." },
  { icon: <Settings className="w-5 h-5" />, title: "Easy Configuration", desc: "Simple web interface for model selection and alert setup." },
];

const addOns = [
  { id: "install", name: "Professional Installation", priceStr: "2,000 BDT", price: 2000, desc: "On-site mounting and network setup" },
  { id: "training", name: "On-Site Training", priceStr: "2,000 BDT", price: 2000, desc: "Expert-led training to help your team set up and operate the system effectively." },
  { id: "remote-training", name: "Remote Training", priceStr: "0.00 BDT", price: 0, desc: "Online training sessions to get the most out of your camera." },
];

const faqs = [
  { q: "What AI models come pre-loaded?", a: "Essential safety models including intrusion detection, fire/smoke detection, and motion tracking are pre-installed." },
  { q: "Can I add more AI models later?", a: "Yes — firmware updates can add new models as they become available." },
  { q: "Does it need internet to work?", a: "No. The camera processes everything locally. Internet is only needed for optional firmware updates." },
  { q: "Can I use this with the Edge Engine?", a: "Yes — the standalone camera can also act as a standard RTSP source for the Edge Engine for centralized processing." },
];

const videos = [
  { id: "rSQWDez6wbA", title: "Standalone Camera Demo" },
];

const trustPoints = [
  { icon: <WifiOff className="w-4 h-4" />, label: "100% Offline" },
  { icon: <Shield className="w-4 h-4" />, label: "IP66 Weatherproof" },
  { icon: <Eye className="w-4 h-4" />, label: "30m Illumination" },
  { icon: <BadgeCheck className="w-4 h-4" />, label: "1 Year Warranty" },
];

const highlights = [
  { num: "4MP", label: "Max Resolution" },
  { num: "30m", label: "Illumination Range" },
  { num: "IP66", label: "Weather Proof" },
  { num: "13+", label: "AI Algorithms" },
];

const aiModels1Algo = [
  { icon: <Eye className="w-4 h-4" />, name: "Human Detection", desc: "Person identification & tracking" },
  { icon: <Shield className="w-4 h-4" />, name: "Area Intrusion", desc: "Perimeter breach detection" },
  { icon: <Flame className="w-4 h-4" />, name: "Fire Detection", desc: "Flame detection & alerts" },
  { icon: <Flame className="w-4 h-4" />, name: "Smoke Detection", desc: "Smoke detection & alerts" },
  { icon: <BadgeCheck className="w-4 h-4" />, name: "Hi-Vis Vest Detection", desc: "Safety vest compliance monitoring" },
  { icon: <BadgeCheck className="w-4 h-4" />, name: "Helmet Detection", desc: "Hard hat compliance monitoring" },
  { icon: <Settings className="w-4 h-4" />, name: "People Counting", desc: "Real-time people count in areas" },
  { icon: <Settings className="w-4 h-4" />, name: "Abnormal Crowd Detection", desc: "Unusual crowd behavior alerts" },
  { icon: <Thermometer className="w-4 h-4" />, name: "Leaving Post Detection", desc: "Personnel abandoning positions" },
  { icon: <Thermometer className="w-4 h-4" />, name: "Supervisor Departure", desc: "Supervisor absence monitoring" },
  { icon: <WifiOff className="w-4 h-4" />, name: "Fall Detection", desc: "Person fall incident alerts" },
  { icon: <WifiOff className="w-4 h-4" />, name: "Smoking Detection", desc: "Unauthorized smoking alerts" },
  { icon: <Shield className="w-4 h-4" />, name: "Fire Extinguisher Detection", desc: "Fire safety equipment monitoring" },
];

const aiModels4Algo = [
  { icon: <Eye className="w-4 h-4" />, name: "Human Detection", desc: "Person identification & tracking" },
  { icon: <Shield className="w-4 h-4" />, name: "Area Intrusion", desc: "Perimeter breach detection" },
  { icon: <Flame className="w-4 h-4" />, name: "Fire Detection", desc: "Flame detection & alerts" },
  { icon: <Flame className="w-4 h-4" />, name: "Smoke Detection", desc: "Smoke detection & alerts" },
  { icon: <BadgeCheck className="w-4 h-4" />, name: "Hi-Vis Vest Detection", desc: "Safety vest compliance monitoring" },
  { icon: <BadgeCheck className="w-4 h-4" />, name: "Helmet Detection", desc: "Hard hat compliance monitoring" },
  { icon: <Settings className="w-4 h-4" />, name: "People Counting", desc: "Real-time people count in areas" },
  { icon: <Settings className="w-4 h-4" />, name: "Abnormal Crowd Detection", desc: "Unusual crowd behavior alerts" },
  { icon: <Thermometer className="w-4 h-4" />, name: "Leaving Post Detection", desc: "Personnel abandoning positions" },
  { icon: <Thermometer className="w-4 h-4" />, name: "Supervisor Departure", desc: "Supervisor absence monitoring" },
  { icon: <WifiOff className="w-4 h-4" />, name: "Fall Detection", desc: "Person fall incident alerts" },
  { icon: <WifiOff className="w-4 h-4" />, name: "Smoking Detection", desc: "Unauthorized smoking alerts" },
  { icon: <Shield className="w-4 h-4" />, name: "Fire Extinguisher Detection", desc: "Fire safety equipment monitoring" },
];

const ProductStandaloneCamera = () => {
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [step, setStep] = useState<"configure" | "checkout">("configure");
  const [selectedAlgoCount, setSelectedAlgoCount] = useState<1 | 4>(4);
  const [quantity, setQuantity] = useState(1);
  const [showSpecs, setShowSpecs] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", location: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const algoPrices = {
    1: 12500,
    4: 25000,
  };

  const basePrice = algoPrices[selectedAlgoCount];
  const formatPrice = (n: number) => `${n.toLocaleString("en-BD")} BDT`;
  const currentSpecs = selectedAlgoCount === 1 ? specs1Algo : specs4Algo;
  const currentAiModels = selectedAlgoCount === 1 ? aiModels1Algo : aiModels4Algo;
  const currentCameraImg = selectedAlgoCount === 1 ? aiCamera1pImg : aiCameraImg;

  const toggleAddOn = (i: number) => {
    setSelectedAddOns(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  const addOnTotal = selectedAddOns.reduce((sum, idx) => sum + addOns[idx].price, 0);
  const unitPrice = basePrice + addOnTotal;
  const totalPrice = unitPrice * quantity;

  const handleCheckoutStep = () => {
    setStep("checkout");
    setTimeout(() => {
      document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleConfigureStep = () => {
    setStep("configure");
    setTimeout(() => {
      document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = '/api/send-order';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          phone: form.phone,
          email: form.email,
          location: form.location,
          notes: form.notes,
          productType: "standalone-camera",
          machineType: `SOHUB Vision AI Camera (${selectedAlgoCount} Algo)`,
          quantity: quantity,
          addOns: selectedAddOns.map(idx => addOns[idx].name),
          totalPrice: totalPrice,
          unitPrice: unitPrice
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setStep('configure');
          setForm({ name: '', company: '', phone: '', email: '', location: '', notes: '' });
          setSelectedAddOns([]);
          setQuantity(1);
        }, 3000);
      } else {
        alert('Failed to submit order. Please try again.');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="SOHUB Vision AI Camera – All-in-One Smart AI Camera | From 12,500 BDT"
        description="4MP Full-Color AI camera with 13+ built-in algorithms. IP66 weatherproof, ≥120dB WDR, and offline processing. Starting from 12,500 BDT."
        path="/products/standalone-camera"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sohub-orange/[0.02] via-transparent to-background" />
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-sohub-orange/[0.03] blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 md:px-8 relative z-10">
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
                <Camera className="w-3.5 h-3.5" /> All-in-One AI Camera
              </span>
              <h1 className="text-section-mobile md:text-section font-extrabold tracking-tight text-foreground mb-5 leading-[1.08]">
                SOHUB Vision
                <br />
                <span className="bg-gradient-to-r from-sohub-orange to-[hsl(189,100%,55%)] bg-clip-text text-transparent">AI Camera</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                A standalone smart camera with AI built right in. No external hardware, no complex setup — just intelligent surveillance out of the box.
              </p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Starting from</span>
                <span className="text-4xl md:text-5xl font-extrabold text-foreground">12,500 BDT</span>
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

              <Button
                onClick={() => document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' })}
                variant="hero" size="lg" className="rounded-xl text-base px-10 py-6 shadow-[0_8px_30px_-6px_hsl(199,100%,50%,0.4)]"
              >
                Order Now
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-md relative">
                <div className="absolute inset-0 bg-gradient-to-br from-sohub-orange/[0.06] to-transparent rounded-3xl blur-2xl scale-110" />
                <div className="relative p-4 rounded-3xl border border-border/60 bg-white shadow-[0_20px_60px_-15px_hsl(0,0%,0%,0.06)]">
                  <img src={aiCameraImg} alt="SOHUB Vision AI Camera" className="w-full h-auto object-contain" />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-2.5 right-8 z-20 px-4 py-1.5 rounded-full bg-[#0DC7FF] text-white text-[10px] font-bold tracking-widest uppercase shadow-[0_10px_25px_-5px_rgba(13,199,255,0.5)] border border-white/20"
                  >
                    Plug & Play
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-10 border-y border-border/60 bg-secondary/20">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 md:px-8">
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
 {/* Order Section */}
      <section className="py-24 md:py-32" id="order-section">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sohub-orange/[0.07] border border-sohub-orange/15 text-xs font-semibold text-sohub-orange uppercase tracking-[0.15em] mb-6">
                <ShoppingBag className="w-3.5 h-3.5" /> Configure & Order
              </span>
              <h2 className="text-section-mobile md:text-section font-bold tracking-tight text-foreground mb-4">
                Get Your AI Camera
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose your AI algorithm package and submit your order request
              </p>
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            {step === "configure" && (
              <motion.div
                key="configure"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="grid lg:grid-cols-5 gap-8">
                  {/* Configuration Panel */}
                  <div className="lg:col-span-3 space-y-6">
                    {/* Algorithm Selection */}
                    <div className="bg-card border border-border rounded-2xl p-6">
                      <h3 className="text-lg font-semibold mb-4">AI Algorithm Package</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <button
                          onClick={() => setSelectedAlgoCount(1)}
                          className={`p-4 rounded-xl border transition-all text-left ${
                            selectedAlgoCount === 1
                              ? "border-sohub-orange bg-sohub-orange/[0.05] ring-1 ring-sohub-orange/20"
                              : "border-border bg-card hover:border-sohub-orange/30"
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              selectedAlgoCount === 1 ? "bg-sohub-orange border-sohub-orange" : "border-border"
                            }`}>
                              {selectedAlgoCount === 1 && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <span className="font-medium">1 AI Algorithm</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Essential intrusion detection for basic security needs
                          </p>
                          <span className="text-lg font-bold text-right block">
                            {formatPrice(12500)}
                          </span>
                        </button>
                        <button
                          onClick={() => setSelectedAlgoCount(4)}
                          className={`p-4 rounded-xl border transition-all text-left ${
                            selectedAlgoCount === 4
                              ? "border-sohub-orange bg-sohub-orange/[0.05] ring-1 ring-sohub-orange/20"
                              : "border-border bg-card hover:border-sohub-orange/30"
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              selectedAlgoCount === 4 ? "bg-sohub-orange border-sohub-orange" : "border-border"
                            }`}>
                              {selectedAlgoCount === 4 && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <span className="font-medium">4 AI Algorithms</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Complete AI suite with fire, smoke, motion & intrusion detection
                          </p>
                          <span className="text-lg font-bold text-right block">
                            {formatPrice(25000)}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Selected Configuration Display */}
                    <div className="bg-card border border-border rounded-2xl p-6">
                      <div className="grid md:grid-cols-12 gap-6">
                        <div className="md:col-span-9">
                          <h3 className="text-lg font-semibold mb-3">
                            SOHUB Vision AI Camera ({selectedAlgoCount} Algorithm{selectedAlgoCount > 1 ? 's' : ''})
                          </h3>
                          <button
                            onClick={() => setShowSpecs(!showSpecs)}
                            className="flex items-center gap-1 text-xs text-sohub-orange mb-3 hover:underline"
                          >
                            {showSpecs ? "Hide" : "View"} specifications
                            {showSpecs ? <ChevronDown className="w-3 h-3 rotate-180" /> : <ChevronDown className="w-3 h-3" />}
                          </button>
                          <AnimatePresence>
                            {showSpecs && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="grid sm:grid-cols-2 gap-2 pt-3 border-t border-border/50">
                                  {currentSpecs.map(s => (
                                    <div key={s.label} className="text-xs">
                                      <span className="text-muted-foreground">{s.label}:</span>{" "}
                                      <span className="font-medium">{s.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          {/* AI Models Display */}
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Included AI Models:</h4>
                            <div className="grid sm:grid-cols-2 gap-2">
                              {currentAiModels.map((model, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs">
                                  <div className="text-sohub-orange">{model.icon}</div>
                                  <span className="font-medium">{model.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-3 flex justify-center">
                          <img
                            src={currentCameraImg}
                            alt="AI Camera"
                            className="w-40 h-32 object-cover rounded-lg"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Add-ons */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Optional Add-ons</h3>
                      <div className="space-y-3">
                        {addOns.map((addon, idx) => (
                          <motion.button
                            key={addon.id}
                            onClick={() => toggleAddOn(idx)}
                            className={`w-full text-left p-4 rounded-xl border transition-all ${
                              selectedAddOns.includes(idx)
                                ? "border-sohub-orange bg-sohub-orange/[0.05] ring-1 ring-sohub-orange/20"
                                : "border-border bg-card hover:border-sohub-orange/30"
                            }`}
                            whileTap={{ scale: 0.995 }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                                  selectedAddOns.includes(idx) ? "bg-sohub-orange border-sohub-orange" : "border-border"
                                }`}>
                                  {selectedAddOns.includes(idx) && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <div>
                                  <p className="font-medium text-sm">{addon.name}</p>
                                  <p className="text-xs text-muted-foreground mt-0.5">{addon.desc}</p>
                                </div>
                              </div>
                              <span className="text-sm font-semibold whitespace-nowrap ml-4">
                                +{addon.priceStr}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="bg-card border border-border rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">Quantity</span>
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                            className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-lg font-bold w-8 text-center">{quantity}</span>
                          <button 
                            onClick={() => setQuantity(quantity + 1)} 
                            className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="lg:col-span-2">
                    <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 space-y-4">
                      <h3 className="text-lg font-semibold">Order Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            AI Camera ({selectedAlgoCount} Algo{selectedAlgoCount > 1 ? 's' : ''})
                          </span>
                          <span>{formatPrice(basePrice)}</span>
                        </div>
                        {selectedAddOns.map(idx => {
                          const addon = addOns[idx];
                          return (
                            <div key={idx} className="flex justify-between">
                              <span className="text-muted-foreground">{addon.name}</span>
                              <span>{formatPrice(addon.price)}</span>
                            </div>
                          );
                        })}
                        <div className="border-t border-border/50 pt-2 flex justify-between">
                          <span className="text-muted-foreground">Unit price</span>
                          <span className="font-medium">{formatPrice(unitPrice)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Quantity</span>
                          <span>×{quantity}</span>
                        </div>
                      </div>
                      <div className="border-t border-border pt-3">
                        <div className="flex justify-between items-baseline">
                          <span className="font-semibold">Total</span>
                          <span className="text-2xl font-bold">{formatPrice(totalPrice)}</span>
                        </div>
                      </div>
                      <button
                        onClick={handleCheckoutStep}
                        className="w-full bg-sohub-orange hover:bg-sohub-orange/90 text-white font-semibold py-3 px-6 rounded-xl transition-colors group"
                      >
                        Continue to Order
                        <ArrowRight className="w-4 h-4 ml-2 inline group-hover:translate-x-1 transition-transform" />
                      </button>
                      <p className="text-xs text-muted-foreground text-center">
                        This is an order inquiry. Payment details will be confirmed separately.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {!submitted && step === "checkout" && (
              <motion.div key="checkout" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="max-w-2xl mx-auto">
                <button onClick={handleConfigureStep} className="text-sm text-sohub-orange mb-8 hover:underline flex items-center font-medium gap-1.5 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back to Configuration
                </button>

                <div className="p-6 md:p-8 rounded-[2rem] border border-border bg-secondary/10 mb-8 max-w-2xl mx-auto shadow-sm">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-foreground"><ShoppingBag className="w-5 h-5 text-sohub-orange" /> Order Summary</h3>
                  <div className="text-sm space-y-2 text-muted-foreground">
                    <p className="font-medium text-foreground flex justify-between">
                      <span>SOHUB Vision AI Camera ({selectedAlgoCount} Algo)</span>
                      <span>{formatPrice(basePrice)}</span>
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
                    <label className="text-sm font-semibold mb-2 block text-foreground">Additional Notes</label>
                    <textarea rows={4} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Any specific requirements or questions" className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-sohub-orange/50 transition-all resize-none font-medium text-foreground" />
                  </div>
                  <div className="pt-2">
                    <Button type="submit" disabled={loading} variant="hero" size="lg" className="w-full rounded-xl py-6 shadow-[0_8px_30px_-6px_hsl(199,100%,50%,0.4)]">
                      {loading ? (
                        <div className="flex items-center">
                          <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </div>
                      ) : (
                        "Submit Order Request"
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
                  <p className="text-muted-foreground leading-relaxed mb-8">Thank you for your interest in the SOHUB Vision AI Camera!</p>
                  <p className="text-sm text-muted-foreground p-4 bg-secondary/50 rounded-xl">Our team will review your order and contact you at <strong className="text-foreground">{form.phone || form.email}</strong> within 1 business day.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Built-in AI Models - HIDDEN */}
      {false && (
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1300px] px-4 sm:px-6 md:px-8">
            <ScrollReveal>
              <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-sohub-orange mb-5">Pre-Loaded</p>
              <h2 className="text-section-mobile md:text-section text-center text-foreground mb-5 font-extrabold">Built-in AI Models</h2>
              <p className="text-center text-muted-foreground text-body-lg mb-16 max-w-lg mx-auto">Ready to detect from the moment you power on.</p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {currentAiModels.map((model, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="p-7 rounded-2xl border border-border/80 bg-background text-center hover:border-sohub-orange/25 hover:shadow-[0_12px_40px_-10px_hsl(0,0%,0%,0.06)] transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-sohub-orange/[0.07] flex items-center justify-center text-sohub-orange mx-auto mb-5 group-hover:bg-sohub-orange/[0.12] group-hover:shadow-[0_4px_16px_-4px_hsl(199,100%,50%,0.15)] transition-all duration-300">
                      {model.icon}
                    </div>
                    <h3 className="font-bold text-foreground mb-1">{model.name}</h3>
                    <p className="text-xs text-muted-foreground">{model.desc}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      <section className="py-24 md:py-32 bg-sohub-gray-50">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 md:px-8">
          <ScrollReveal>
            <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-sohub-orange mb-5">Benefits</p>
            <h2 className="text-section-mobile md:text-section text-center text-foreground mb-5 font-extrabold">Why Standalone Camera?</h2>
            <p className="text-center text-muted-foreground text-body-lg mb-20 max-w-xl mx-auto">Perfect for small setups, single entry points, or rapid deployment.</p>
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

      {/* Specifications - HIDDEN */}
      {false && (
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1300px] px-4 sm:px-6 md:px-8">
            <ScrollReveal>
              <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-sohub-orange mb-5">Specs</p>
              <h2 className="text-section-mobile md:text-section text-center text-foreground mb-20 font-extrabold">Technical Specifications</h2>
            </ScrollReveal>
            <div className="max-w-2xl mx-auto bg-background rounded-3xl border border-border/80 overflow-hidden shadow-[0_4px_20px_-8px_hsl(0,0%,0%,0.05)]">
              {currentSpecs.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className={`flex justify-between items-center py-5 px-7 ${i < currentSpecs.length - 1 ? "border-b border-border/50" : ""} ${i % 2 === 0 ? "bg-secondary/15" : ""}`}
                >
                  <span className="text-sm font-semibold text-foreground">{s.label}</span>
                  <span className="text-sm text-muted-foreground font-medium">{s.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Videos - HIDDEN */}
      {false && videos.length > 0 && (
        <section className="py-24 md:py-32 bg-sohub-gray-50">
          <div className="mx-auto max-w-[1300px] px-4 sm:px-6 md:px-8">
            <ScrollReveal>
              <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-sohub-orange mb-5">Demo</p>
              <h2 className="text-section-mobile md:text-section text-center text-foreground mb-16 font-extrabold">See It In Action</h2>
            </ScrollReveal>
            <div className="max-w-3xl mx-auto">
              {videos.map(v => (
                <div key={v.id} className="rounded-3xl overflow-hidden border border-border shadow-[0_20px_60px_-15px_hsl(0,0%,0%,0.08)]">
                  <div className="aspect-video">
                    {!isVideoPlaying ? (
                      <div className="group cursor-pointer" onClick={() => setIsVideoPlaying(true)}>
                        <div className="relative aspect-video bg-muted">
                          <img
                            src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`}
                            alt={v.title}
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center group-hover:bg-foreground/50 transition-colors">
                            <div className="w-16 h-16 rounded-full bg-sohub-orange flex items-center justify-center group-hover:scale-110 transition-transform">
                              <svg className="w-8 h-8 text-white fill-current ml-1" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>

                          {/* Title Badge */}
                          <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-sohub-orange to-sohub-orange/80 backdrop-blur-sm rounded px-3 py-2 shadow-lg">
                            <p className="font-semibold text-white text-sm">
                              {v.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <iframe
                        src={`https://www.youtube.com/embed/${v.id}?autoplay=1`}
                        title={v.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

     
      {/* Upsell Banner */}
      <section className="py-16 bg-gradient-to-r from-foreground/[0.02] via-sohub-orange/[0.04] to-foreground/[0.02] border-y border-border/60">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 md:px-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">Need more cameras or centralized processing?</p>
          <h3 className="text-xl font-bold text-foreground mb-4">
            Check out the <span className="text-sohub-orange">SOHUB AI Vision</span> for multi-camera setups.
          </h3>
          <Link to="/products/edge-engine#order-section">
            <Button variant="hero-outline" size="lg" className="rounded-xl text-sm px-8 py-5">
              View SOHUB AI Vision — From 95,000 BDT
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-sohub-gray-50">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 md:px-8">
          <ScrollReveal>
            <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-sohub-orange mb-4">FAQ</p>
            <h2 className="text-section-mobile md:text-section text-center text-foreground mb-16 font-extrabold">Frequently Asked Questions</h2>
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
      <WhatsAppChat />
    </div>
  );
};

export default ProductStandaloneCamera;
