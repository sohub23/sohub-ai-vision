import { Facebook, Linkedin, Youtube } from "lucide-react";

const socialLinks = [
  { icon: <Facebook className="w-4 h-4" />, href: "https://facebook.com/sohub", label: "Facebook" },
  { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com/company/sohub", label: "LinkedIn" },
  { icon: <Youtube className="w-4 h-4" />, href: "https://youtube.com/@sohub", label: "YouTube" },
];

const Footer = () => (
  <footer className="py-16 border-t border-border bg-sohub-gray-50">
    <div className="mx-auto max-w-[1300px] px-4 sm:px-6 md:px-8">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <a href="/" className="flex items-center gap-2 mb-3">
            <span className="text-xl font-bold text-foreground">SOHUB</span>
            <span className="text-xl font-light text-sohub-orange">AI Vision</span>
          </a>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-5">
            SOHUB AI Vision — edge AI for real-time surveillance understanding. The first product in the SOHUB AI ecosystem. Built for Bangladesh.
          </p>
          {/* Social Links */}
          <div className="flex items-center gap-3 mb-4">
            {socialLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-9 h-9 rounded-lg border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-sohub-orange hover:border-sohub-orange/30 transition-all duration-200"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/60">A product initiative by SOHUB</p>
        </div>

        {/* Product links */}
        <div>
          <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-foreground mb-4">Products</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><a href="/products/edge-engine" className="hover:text-foreground transition-colors">Edge Engine</a></li>
            <li><a href="/products/standalone-camera" className="hover:text-foreground transition-colors">Standalone Camera</a></li>
            <li><a href="/#capabilities" className="hover:text-foreground transition-colors">Capabilities</a></li>
            <li><a href="/#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
          </ul>
        </div>

        {/* Company links */}
        <div>
          <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-foreground mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><a href="/#contact" className="hover:text-foreground transition-colors">About SOHUB</a></li>
            <li><a href="/#deployment" className="hover:text-foreground transition-colors">Deployment</a></li>
            <li><a href="mailto:info@sohub.com.bd" className="hover:text-foreground transition-colors">Contact</a></li>
            <li><a href="/#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} SOHUB. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-xs text-muted-foreground/60">
          <span>Dhaka, Bangladesh</span>
          <span>·</span>
          <a href="mailto:info@sohub.com.bd" className="hover:text-foreground transition-colors">info@sohub.com.bd</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
