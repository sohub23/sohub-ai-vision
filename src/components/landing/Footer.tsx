import { useLocation } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";
import hotscanQR from "@/assets/sohub_Ai_htoscan.png";


const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@solutionhubtechnologysohub", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  )},
  { label: "Facebook", href: "https://www.facebook.com/solutionhubtechnologies", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  )},
  { label: "LinkedIn", href: "https://www.linkedin.com/company/solution-hub-technologie-sohub", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  )},
];

const QRExpandable = ({ size = 'md' }: { size?: 'sm' | 'md' }) => {
  const [expanded, setExpanded] = useState(false);
  const imgSize = size === 'sm' ? 'w-16 h-16' : 'w-20 h-20';
  const containerPad = size === 'sm' ? 'p-2' : 'p-2.5';

  return (
    <>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setExpanded(true)}
          className={`bg-white rounded-xl ${containerPad} shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 relative group cursor-pointer transition-transform hover:scale-105`}
        >
          <img src={hotscanQR} alt="Call with Hotscan" className={`${imgSize} object-contain`} />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-xl transition-colors flex items-center justify-center">
            <Maximize2 className="w-4 h-4 text-sohub-orange opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>
        <div>
          <p className={`${size === 'sm' ? 'text-[11px]' : 'text-xs'} font-medium text-primary-foreground/60`}>Call With<br/>Hotscan</p>
          <p className={`${size === 'sm' ? 'text-[9px]' : 'text-[10px]'} text-primary-foreground/40 mt-0.5`}>Tap to enlarge</p>
        </div>
      </div>

      {/* Expanded Modal */}
      {expanded && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setExpanded(false)}
        >
          <div
            className="relative bg-white rounded-3xl p-8 shadow-2xl max-w-xs w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
            <div className="text-center">
              <p className="text-[16px] font-semibold text-[#202124] mb-1">Call With Hotscan</p>
              <p className="text-[13px] text-[#5f6368] mb-5">Point your phone camera at this QR code</p>
              <div className="bg-[#f8f9fa] rounded-2xl p-6 inline-block border border-gray-100">
                <img src={hotscanQR} alt="Call With Hotscan" className="w-56 h-56 object-contain" />
              </div>
              <p className="text-[12px] text-[#5f6368] mt-4">SOHUB — Solution Hub Technologies</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

const Footer = () => {
  const location = useLocation();

  const handleNavClick = (href: string) => {
    if (location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
  <footer className="border-t border-border bg-foreground">
    <div className="mx-auto max-w-[1300px] px-4 sm:px-6 md:px-8 pt-16">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <img 
            src="/logo/sohub_ai.png" 
            alt="SOHUB AI Vision" 
            className="h-10 w-auto mb-3 invert"
          />
          <p className="text-sm text-primary-foreground/60 max-w-sm leading-relaxed">
            SOHUB AI Vision — edge AI for real-time surveillance understanding. The first product in the SOHUB AI ecosystem. Built for Bangladesh.
          </p>
          {/* Mobile layout: Platform and Company side by side */}
          <div className="md:hidden grid grid-cols-2 gap-8 mt-8">
            <div>
              <h4 className="text-sm font-semibold mb-4 text-primary-foreground">Products</h4>
              <ul className="space-y-2.5 text-sm text-primary-foreground/50">
                <li><a href="/products/edge-engine" className="hover:text-primary-foreground transition-colors">Edge Engine</a></li>
                <li><a href="/products/standalone-camera" className="hover:text-primary-foreground transition-colors">Standalone Camera</a></li>
                <li><button onClick={() => handleNavClick("#capabilities")} className="hover:text-primary-foreground transition-colors text-left">Capabilities</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-primary-foreground">Company</h4>
              <ul className="space-y-2.5 text-sm text-primary-foreground/50">
                <li><button onClick={() => handleNavClick("#deployment")} className="hover:text-primary-foreground transition-colors text-left">Deployment</button></li>
                <li><a href="/contact" className="hover:text-primary-foreground transition-colors">Contact</a></li>
                <li><button onClick={() => handleNavClick("#faq")} className="hover:text-primary-foreground transition-colors text-left">FAQ</button></li>
                <li><a href="https://wa.me/8801XXXXXXXXX" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          {/* Social Links and QR Code - Mobile Layout */}
          <div className="md:hidden flex items-start justify-between mt-6">
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/40 hover:text-primary-foreground transition-colors p-2 rounded-full hover:bg-primary-foreground/10"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <QRExpandable size="sm" />
          </div>
          
          {/* Social Links - Desktop Only */}
          <div className="hidden md:flex items-center gap-3 mt-6">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/40 hover:text-primary-foreground transition-colors p-2 rounded-full hover:bg-primary-foreground/10"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="hidden md:block">
          <h4 className="text-sm font-semibold mb-4 text-primary-foreground">Products</h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/50">
            <li><a href="/products/edge-engine" className="hover:text-primary-foreground transition-colors">Edge Engine</a></li>
            <li><a href="/products/standalone-camera" className="hover:text-primary-foreground transition-colors">Standalone Camera</a></li>
            <li><button onClick={() => handleNavClick("#capabilities")} className="hover:text-primary-foreground transition-colors text-left">Capabilities</button></li>
          </ul>
        </div>
        <div className="hidden md:block">
          <h4 className="text-sm font-semibold mb-4 text-primary-foreground">Company</h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/50">
            <li><button onClick={() => handleNavClick("#deployment")} className="hover:text-primary-foreground transition-colors text-left">Deployment</button></li>
            <li><a href="/contact" className="hover:text-primary-foreground transition-colors">Contact</a></li>
            <li><button onClick={() => handleNavClick("#faq")} className="hover:text-primary-foreground transition-colors text-left">FAQ</button></li>
            <li><a href="https://wa.me/8801833838965" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">WhatsApp</a></li>
          </ul>
        </div>
        {/* Desktop QR Code */}
        <div className="hidden md:block">
          <QRExpandable size="sm" />
        </div>
      </div>
   
      <div className="mt-12 py-8 border-t border-primary-foreground/10 text-xs text-primary-foreground/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div><p className="text-xs text-muted-foreground/60"> A product of SOHUB — Solution Hub Technologies</p></div>
        <p className="text-xs text-muted-foreground/60 te">
          © {new Date().getFullYear()} SOHUB. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
};

export default Footer;
