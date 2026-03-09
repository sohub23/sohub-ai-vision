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
  { icon: <Facebook className="w-4 h-4" />, href: "https://facebook.com/sohub", label: "Facebook" },
  { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com/company/sohub", label: "LinkedIn" },
  { icon: <Youtube className="w-4 h-4" />, href: "https://youtube.com/@sohub", label: "YouTube" },
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

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0% -35% 0%",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = ["problem", "capabilities", "deployment", "faq"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    fetch("https://sohub.netlify.app/api/initiatives.json", {
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
    const isHashLink = href.startsWith("/#");

    if (isHashLink) {
      const hash = href.replace("/", "");

      if (isHome) {
        // If already on home page, prevent default router navigation and just scroll
        e.preventDefault();
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", hash);
        }
      }
      // If on another page, let Link component handle the navigation to /#hash
      // The useEffect above will handle the scrolling once the page loads
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div
        className={`bg-secondary/50 border-b border-border/50 transition-all duration-300 overflow-hidden ${scrolled ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
          }`}
      >
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 md:px-8 py-2">
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
              <p className="text-xs md:text-sm text-muted-foreground">
                <span className="hidden sm:inline">
                  Solution Hub Technologies(SOHUB) Owned & Operated
                </span>
                <span className="sm:hidden">SOHUB Owned & Operated</span>
              </p>
            </a>
            <DropdownMenu modal={false} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[12px] sm:text-sm text-muted-foreground hover:bg-transparent hover:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 flex items-center gap-1 mr-[-1rem] sm:mr-0"
                >
                  Our Initiatives
                  {dropdownOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[320px] p-3" sideOffset={5}>
                <div className="grid grid-cols-3 gap-3">
                  {initiatives.map((initiative) => {
                    const isCurrentSite =
                      initiative.id === "vision" ||
                      initiative.name.toLowerCase().includes("vision");
                    return initiative.href ? (
                      <a
                        key={initiative.id}
                        href={initiative.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center p-4 rounded-lg border ${isCurrentSite
                          ? "border-sohub-orange bg-sohub-orange/10 ring-2 ring-sohub-orange/30"
                          : "border-border"
                          }`}
                      >
                        <img
                          src={`https://sohub.netlify.app${initiative.logo}`}
                          alt={initiative.name}
                          className="w-full h-full object-contain"
                        />
                      </a>
                    ) : (
                      <div
                        key={initiative.id}
                        className="flex items-center justify-center p-4 rounded-lg border border-border opacity-50 cursor-not-allowed"
                      >
                        <img
                          src={`https://sohub.netlify.app${initiative.logo}`}
                          alt={initiative.name}
                          className="w-full h-full object-contain"
                        />
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
            <span className="text-xl font-extrabold tracking-tight text-foreground">SOHUB</span>
            <span className="text-xl font-light text-sohub-orange">AI Vision</span>
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
