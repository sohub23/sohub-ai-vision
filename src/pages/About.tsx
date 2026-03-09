import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Trophy, Target } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";
import SEOHead from "@/components/SEOHead";

const About = () => {
    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
            <SEOHead
                title="About SOHUB AI Vision | Proactive Edge Intelligence for Bangladesh"
                description="Learn why SOHUB AI Vision exists and our mission to provide secure, offline, and affordable AI surveillance for Bangladesh."
                path="/about"
            />
            <Navbar />

            <main className="flex-grow pt-28 pb-20 mt-16 mb-8">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#111827] mb-12">
                            About SOHUB <span className="text-[#0DC7FF]">AI Vision</span>
                        </h1>
                        <p className="text-[1.15rem] text-[#4B5563] italic max-w-3xl mx-auto leading-relaxed">
                            "SOHUB AI Vision brings global-standard edge intelligence to Bangladesh — locally processed, fully private, and subscription-free — with a deep respect for your right to secure, proactive surveillance."
                        </p>
                    </div>

                    <div className="space-y-20">
                        {/* Why section */}
                        <ScrollReveal>
                            <div className="text-center space-y-6">
                                <h2 className="text-[1.75rem] font-bold text-[#111827]">Why does SOHUB AI exist?</h2>
                                <p className="text-[1.05rem] text-[#4B5563] font-medium">
                                    Because in a country like Bangladesh, <span className="text-[#0DC7FF]">#TruePrice</span> and <span className="text-[#0DC7FF]">real-time security</span> are rights, not luxuries.
                                </p>
                                <div className="space-y-4 max-w-2xl mx-auto text-[#6B7280] leading-relaxed">
                                    <p>
                                        Surveillance shouldn't just be about recording what happened <em>after</em> it's too late. It should be about understanding and preventing incidents <em>before</em> they occur. Yet, many are forced to choose between passive recording or expensive, unstable cloud-AI that risks their data privacy.
                                    </p>
                                    <p>
                                        At SOHUB AI, we are your shield.
                                    </p>
                                    <p>
                                        We bring the world's most advanced Edge AI processing directly to your local network. We curate, test, and guarantee the intelligence that protects your people and assets.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Promise Box */}
                        <ScrollReveal>
                            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-2xl overflow-hidden">
                                <CardContent className="p-10">
                                    <h3 className="text-center text-[1.5rem] font-bold text-[#111827] mb-10">Our Promise:</h3>
                                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                                        {[
                                            { title: "100% Offline", desc: "No internet, no bandwidth drain, no downtime." },
                                            { title: "No Recurring Fees", desc: "One-time deployment. No monthly AI subscriptions." },
                                            { title: "Data Stays Local", desc: "Your footage never leaves your building. Full privacy." },
                                            { title: "Sub-200ms Latency", desc: "Real-time detection for immediate action." },
                                            { title: "Works with Existing CCTV", desc: "Upgrade current cameras without replacing them." },
                                            { title: "Innovation for Bangladesh", desc: "Built to thrive in local infrastructure realities." }
                                        ].map((item, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="w-6 h-6 rounded-md bg-[#0DC7FF]/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check className="w-4 h-4 text-[#0DC7FF]" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#111827] text-sm">{item.title}</p>
                                                    <p className="text-xs text-[#6B7280] mt-0.5">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </ScrollReveal>

                        {/* Vision & Mission */}
                        <div className="grid md:grid-cols-2 gap-12">
                            <ScrollReveal>
                                <div className="text-center space-y-4">
                                    <div className="w-12 h-12 bg-[#0DC7FF]/5 shadow-sm rounded-xl flex items-center justify-center mx-auto text-[#0DC7FF]">
                                        <Trophy className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-[1.5rem] font-bold text-[#111827]">Vision</h3>
                                    <p className="text-[0.95rem] text-[#4B5563] leading-relaxed">
                                        To empower every business and household in Bangladesh with proactive, intelligent surveillance that is secure, affordable, and requires zero reliance on the cloud.
                                    </p>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal>
                                <div className="text-center space-y-4">
                                    <div className="w-12 h-12 bg-[#0DC7FF]/5 shadow-sm rounded-xl flex items-center justify-center mx-auto text-[#0DC7FF]">
                                        <Target className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-[1.5rem] font-bold text-[#111827]">Mission</h3>
                                    <p className="text-[0.95rem] text-[#4B5563] leading-relaxed">
                                        We believe that intelligence, safety, and privacy should be accessible without heavy brand premiums or hidden costs. We are here to lead the shift to **Edge Intelligence**.
                                    </p>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Mission Detailed Text */}
                        <ScrollReveal>
                            <div className="max-w-2xl mx-auto text-center space-y-6 text-[#6B7280] leading-relaxed">
                                <p>
                                    In today's world, security is often a trade-off. You either pay high monthly fees to global tech giants, or you settle for "dumb" cameras that only show you what you've already lost. At SOHUB AI, we believe this is a compromise you shouldn't have to make.
                                </p>
                                <p className="text-[#0DC7FF] font-medium">
                                    We are here to lead the shift to Edge Intelligence — through hardware innovation and the courage to bring you processing power that rivals the best global brands — but built for the real infrastructure of Bangladesh.
                                </p>
                                <p>
                                    This is not just about cameras. It is about giving you <strong>earlier decisions</strong> — protecting you from risks before they escalate, while keeping your data strictly in your hands.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default About;
