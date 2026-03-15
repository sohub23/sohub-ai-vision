import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Facebook, Linkedin, Youtube, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Initiative {
  id: string;
  name: string;
  description: string;
  href: string | null;
  logo: string;
  order: number;
  isActive: boolean;
}

const navLinks = [
  { label: "Problem", href: "/#problem" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Deployment", href: "/#deployment" },
  { label: "FAQ", href: "/#faq" },
];

const socialLinks = [
  { icon: <Facebook className="w-4 h-4" />, href: "https://www.facebook.com/solutionhubtechnologies/", label: "Facebook" },
  { icon: <Linkedin className="w-4 h-4" />, href: "https://www.linkedin.com/company/solution-hub-technologie-sohub/", label: "LinkedIn" },
  { icon: <Youtube className="w-4 h-4" />, href: "https://www.youtube.com/@solutionhubtechnologysohub", label: "YouTube" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    // Handle scrolling when arriving at homepage with a hash
    if (isHome && location.hash) {
      setTimeout(() => {
        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [isHome, location.hash]);

  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      const sections = ["problem", "capabilities", "deployment", "faq"];
      const scrollPosition = window.scrollY + 100; // Offset for header

      let currentSection = "";

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;

          // Check if we're within this section's boundaries
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = sectionId;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    // Initial check
    handleScroll();

    // Listen to scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  useEffect(() => {
    fetch("https://sohub.com.bd/api/initiatives.json", {
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setInitiatives(Array.isArray(data) ? data : data.initiatives || []))
      .catch(() => { });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Just close the mobile menu. The Link component will handle the 'to' navigation.
    // The useEffect that listens for location.hash changes (line 41) will handle smooth scrolling.
    setOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div
        className={`bg-secondary/50 border-b border-border/50 transition-all duration-300 overflow-hidden ${scrolled ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
          }`}
      >
        <div className="mx-auto max-w-[1250px] px-4 sm:px-6 md:px-2 py-0.5">
          <div className="flex items-center justify-between">
            <a
              href="https://sohub.com.bd/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <img
                src="/logo/solution-hub-technologies.png"
                alt="Solution Hub"
                className="h-8"
              />
              <p className="text-[10px] md:text-xs text-muted-foreground">
                <span className="hidden md:inline">
                  Solution Hub Technologies(SOHUB) Owned & Operated
                </span>
                <span className="md:hidden">SOHUB owned & operated</span>
              </p>
            </a>
            <DropdownMenu modal={false} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs hover:bg-transparent hover:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-muted-foreground gap-1 md:mr-0 -mr-4"
                >
                  Our Initiatives
                  {dropdownOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[320px] p-3" sideOffset={5}>
                <div className="grid grid-cols-3 gap-3">
                  {initiatives.map((initiative) => {
                    const isCurrentSite =
                      initiative.id === "sohub" ||
                      initiative.id === "vision" ||
                      initiative.name.toLowerCase() === "sohub ai" ||
                      initiative.name.toLowerCase().includes("vision");

                    const getInitiativeLogo = (initiative: Initiative) => {
                      const logoPath = initiative.logo;
                      const name = initiative.name.toLowerCase();

                      // 1. Use API path if available (prefer sohub.com.bd)
                      if (logoPath) {
                        if (logoPath.startsWith('/api')) {
                          return `https://sohub.com.bd${logoPath}`;
                        }
                        if (logoPath.startsWith('http')) {
                          return logoPath;
                        }
                      }

                      // 2. Fallbacks
                      if (isCurrentSite) return "/logo/sohub_ai.png";
                      return `https://sohub.com.bd${logoPath}`;
                    };

                    return (
                      <div key={initiative.id}>
                        {initiative.href ? (
                          <a
                            href={initiative.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-center p-4 rounded-lg border ${isCurrentSite
                              ? "border-sohub-orange bg-sohub-orange/10 ring-2 ring-sohub-orange/30"
                              : "border-border"
                              }`}
                          >
                            <img
                              src={getInitiativeLogo(initiative)}
                              alt={initiative.name}
                              className="w-full h-full object-contain"
                            />
                          </a>
                        ) : (
                          <div
                            className="flex items-center justify-center p-4 rounded-lg border border-border opacity-50 cursor-not-allowed"
                          >
                            <img
                              src={getInitiativeLogo(initiative)}
                              alt={initiative.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main header */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-background/70 backdrop-blur-xl border-b border-border/40"
      >
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 md:px-8 flex items-center justify-between h-14">
          <a href="/" className="flex items-center gap-1.5">
            <img src="/logo/sohub_ai.png" alt="SOHUB AI Vision" className="h-8" />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {navLinks.map((link) => {
              const isActive = isHome && activeSection === link.href.split("#")[1];
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`transition-all duration-200 px-4 py-2 rounded-full font-medium text-sm ${isActive
                    ? "bg-sohub-orange/15 text-sohub-orange"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* Social icons - desktop */}
            <div className="hidden sm:flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-8 h-8 rounded-lg border border-border/50 bg-background/50 flex items-center justify-center text-muted-foreground hover:text-sohub-orange hover:border-sohub-orange/30 transition-all duration-200"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-xl"
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = isHome && activeSection === link.href.split("#")[1];
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={(e) => {
                        handleNavClick(e, link.href);
                        setOpen(false);
                      }}
                      className={`block py-3 px-4 rounded-xl text-base transition-colors ${isActive
                        ? "bg-sohub-orange/10 text-sohub-orange font-semibold"
                        : "text-foreground hover:bg-secondary"
                        }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="pt-3 flex items-center gap-2">
                  {socialLinks.map((link) => (
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div >
  );
};

export default Navbar;
