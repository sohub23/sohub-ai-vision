import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import ContactModal from "@/components/ContactModal";

const CTASection = () => (
  <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] via-sohub-orange/[0.04] to-foreground/[0.02]" />
    <div className="absolute inset-0">
      <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-grid)" />
      </svg>
    </div>
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    
    <div className="container mx-auto px-6 relative z-10">
      <ScrollReveal>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sohub-orange mb-4">Get Started</p>
            <h2 className="text-section-mobile md:text-[3rem] leading-tight font-extrabold text-foreground mb-4">
              Let's make prevention normal.
            </h2>
            <p className="text-muted-foreground text-body-lg mb-10">
              Ready to deploy AI Vision? Contact us to discuss your surveillance needs.
            </p>
          </motion.div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ContactModal>
              <Button variant="hero" size="lg" className="rounded-xl text-base px-10 py-6 shadow-[0_8px_30px_-6px_hsl(199,100%,50%,0.4)]">
                Contact Us
              </Button>
            </ContactModal>
            <a href="#deployment">
              <Button variant="outline" size="lg" className="rounded-xl text-base px-10 py-6 border-border hover:bg-secondary">
                View Products
              </Button>
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default CTASection;
