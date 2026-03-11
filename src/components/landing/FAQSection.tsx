import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  { q: "Does it require internet?", a: "No. SOHUB AI Vision operates entirely offline within your local network. Internet is only needed for optional remote monitoring or firmware updates." },
  { q: "Can it work with existing CCTV?", a: "Yes. SOHUB AI Vision works with standard IP cameras (ONVIF/RTSP compatible). No need to replace your existing infrastructure." },
  { q: "How many cameras per box?", a: "The Edge Vision Engine supports 4, 8, or more channels depending on configuration. It scales with additional units." },
  { q: "How are false alarms handled?", a: "Each detection model has configurable thresholds and sensitivity settings. The system learns from your environment to minimize false positives." },
  { q: "Can it integrate with other systems?", a: "Yes. SOHUB AI Vision supports Webhook, MQTT, alarm outputs, and announcement systems for seamless integration with your existing infrastructure." },
  { q: "Is data stored locally?", a: "Yes. All video processing and data storage happens on-premise. No footage or data leaves your network." },
];

const FAQSection = () => (
  <section id="faq" className="bg-secondary/30 py-24 md:py-32 relative">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    
    <div className="container mx-auto px-6 max-w-2xl">
      <ScrollReveal>
        <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-sohub-orange mb-4">FAQ</p>
        <h2 className="text-section-mobile md:text-section text-center text-foreground mb-12">
          Frequently asked questions
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border rounded-xl px-6 data-[state=open]:shadow-md data-[state=open]:border-sohub-orange/20 transition-all duration-200"
            >
              <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline py-5 text-[15px]">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollReveal>
    </div>
  </section>
);

export default FAQSection;
