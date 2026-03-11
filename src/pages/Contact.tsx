import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import WhatsAppChat from "@/components/WhatsAppChat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Clock } from "lucide-react";

const Contact = () => {
    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow pt-28 pb-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Header Section */}
                    <div className="text-center mb-14 space-y-3 mt-10">
                        <h1 className="text-section-mobile md:text-section font-bold tracking-[-0.02em] text-[#0DC7FF]">
                            Get in Touch
                        </h1>
                        <p className="text-[1.05rem] text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
                            Ready to transform your vision inspection? Our experts are here to<br className="hidden sm:block" /> help you design the perfect edge AI solution for your needs.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-10 items-start">
                        {/* Contact Info - takes up 5 cols out of 12 */}
                        <div className="lg:col-span-5 space-y-6">
                            <div>
                                <h2 className="text-[1.35rem] font-bold text-[#111827] tracking-tight mb-2">Contact Information</h2>
                                <p className="text-[0.95rem] text-[#6B7280] leading-relaxed pr-6">
                                    Reach out to us through any of these channels. We typically respond within 1-2 business days.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {/* Call Us Card */}
                                <Card className="border border-[#E5E7EB] shadow-sm bg-white rounded-xl overflow-hidden">
                                    <CardContent className="p-5 flex items-center gap-5">
                                        <div className="w-12 h-12 bg-[#0DC7FF]/10 rounded-xl flex items-center justify-center text-[#0DC7FF] shrink-0">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold text-[#111827] text-sm mb-0.5">Call Us</h3>
                                            <div className="text-sm text-[#6B7280] leading-snug">
                                                <p>Ready to help you</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Email Us Card */}
                                <Card className="border border-[#E5E7EB] shadow-sm bg-white rounded-xl overflow-hidden">
                                    <CardContent className="p-5 flex items-center gap-5">
                                        <div className="w-12 h-12 bg-[#0DC7FF]/10 rounded-xl flex items-center justify-center text-[#0DC7FF] shrink-0">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold text-[#111827] text-sm mb-0.5">Email Us</h3>
                                            <div className="text-sm text-[#6B7280] leading-snug">
                                                <p>We'll respond within 24 hours</p>
                                                <a href="mailto:hello@sohub.com.bd" className="hover:text-[#0DC7FF] transition-colors block mt-0.5 text-[#0DC7FF] font-medium">hello@sohub.com.bd</a>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Response Time Card */}
                                <Card className="border border-[#E5E7EB] shadow-sm bg-white rounded-xl overflow-hidden">
                                    <CardContent className="p-5 flex items-center gap-5">
                                        <div className="w-12 h-12 bg-[#0DC7FF]/10 rounded-xl flex items-center justify-center text-[#0DC7FF] shrink-0">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold text-[#111827] text-sm mb-0.5">Response Time</h3>
                                            <div className="text-sm text-[#6B7280] leading-snug">
                                                <p className="font-medium text-[#111827]">Quick support</p>
                                                <p className="mt-0.5">Within 24 hours</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Contact Form - takes up 7 cols out of 12 */}
                        <div className="lg:col-span-7">
                            <Card className="shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-[#E5E7EB] bg-white rounded-2xl">
                                <CardHeader className="px-8 pt-8 pb-6">
                                    <CardTitle className="text-[1.75rem] font-bold text-[#111827] tracking-tight">Send us a message</CardTitle>
                                    <CardDescription className="text-[0.95rem] text-[#6B7280] mt-1.5">
                                        Fill out the form below and our team will get back to you shortly.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-8 pb-8">
                                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label htmlFor="firstName" className="text-[0.85rem] font-semibold text-[#374151]">First Name</label>
                                                <Input id="firstName" placeholder="John" className="h-11 border-[#E5E7EB] bg-white text-sm focus-visible:ring-[#0DC7FF]" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label htmlFor="lastName" className="text-[0.85rem] font-semibold text-[#374151]">Last Name</label>
                                                <Input id="lastName" placeholder="Doe" className="h-11 border-[#E5E7EB] bg-white text-sm focus-visible:ring-[#0DC7FF]" />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="email" className="text-[0.85rem] font-semibold text-[#374151]">Email Address</label>
                                            <Input id="email" type="email" placeholder="john.doe@company.com" className="h-11 border-[#E5E7EB] bg-white text-sm focus-visible:ring-[#0DC7FF]" />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="company" className="text-[0.85rem] font-semibold text-[#374151]">Company (Optional)</label>
                                            <Input id="company" placeholder="Your Company Name" className="h-11 border-[#E5E7EB] bg-white text-sm focus-visible:ring-[#0DC7FF]" />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="message" className="text-[0.85rem] font-semibold text-[#374151]">Message</label>
                                            <Textarea
                                                id="message"
                                                placeholder="Tell us about your project or how we can help..."
                                                className="min-h-[120px] bg-white border-[#E5E7EB] text-sm resize-y focus-visible:ring-[#0DC7FF]"
                                            />
                                        </div>

                                        <div className="pt-2">
                                            <Button className="w-full h-12 bg-[#0DC7FF] hover:bg-[#0bb2e6] text-white font-semibold text-[0.95rem] rounded-xl shadow-[0_4px_14px_0_rgba(13,199,255,0.39)] transition-all" size="lg">
                                                Send Message
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <WhatsAppChat />
        </div>
    );
};

export default Contact;
