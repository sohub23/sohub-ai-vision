import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface Initiative {
    id: string;
    name: string;
    description: string;
    logo: string;
    href: string | null;
    order: number;
    isActive: boolean;
}

const BASE_URL = 'https://sohub.com.bd';
const API_URL = 'https://sohub.com.bd/api/initiatives.json';

const isCurrentSite = (item: Initiative) =>
    item.id === 'sohub-ai' || item.name.toLowerCase().includes('sohub ai');

/* ──────────────────────────────────────────────
   DESKTOP VERSION
   ────────────────────────────────────────────── */
const DesktopOurInitiatives = ({ initiatives }: { initiatives: Initiative[] }) => {
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true, margin: '-10%' });

    return (
        <section id="initiatives" className="section-padding  relative overflow-hidden py-16">
            <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 25 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-14"
                >
                    <h2
                        className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground"
                    >
                        Our Initiatives
                    </h2>
                </motion.div>

                {/* Grid — 4 columns */}
                <div className="grid grid-cols-4 gap-5">
                    {initiatives.map((item, i) => {
                        const isCurrent = isCurrentSite(item);

                        const CardContent = (
                            <>
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <img
                                        src={`${BASE_URL}${item.logo}`}
                                        alt={item.name}
                                        className="w-12 h-12 object-contain flex-shrink-0"
                                    />
                                    <span className="text-[15px] font-medium text-foreground whitespace-nowrap">
                                        {item.name}
                                    </span>
                                </div>
                                {item.href && (
                                    <ExternalLink className="w-5 h-5 text-muted-foreground flex-shrink-0 group-hover:text-foreground transition-colors" />
                                )}
                            </>
                        );

                        const highlightClass = isCurrent
                            ? 'border-primary bg-primary/10 ring-2 ring-primary/30'
                            : 'border-border/50 hover:border-primary/30 hover:shadow-sm';

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.1 + i * 0.04,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group flex items-center justify-between bg-background border rounded-2xl px-5 py-5 transition-all duration-200 cursor-pointer ${highlightClass}`}
                                    >
                                        {CardContent}
                                    </a>
                                ) : (
                                    <div className={`flex items-center justify-between bg-background border rounded-2xl px-5 py-5 ${highlightClass}`}>
                                        {CardContent}
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

/* ──────────────────────────────────────────────
   MOBILE VERSION
   ────────────────────────────────────────────── */
const MobileOurInitiatives = ({ initiatives }: { initiatives: Initiative[] }) => {
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true, margin: '-5%' });

    return (
        <section id="initiatives" className="py-10 bg-secondary/30">
            <div className="px-4">
                {/* Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 16 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-6"
                >
                    <h2
                        className="text-[22px] font-medium tracking-tight text-foreground leading-[1.2]"
                    >
                        Our Initiatives
                    </h2>
                </motion.div>

                {/* List — single column */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-2"
                >
                    {initiatives.map((item) => {
                        const isCurrent = isCurrentSite(item);

                        const highlightClass = isCurrent
                            ? 'border-primary bg-primary/10 ring-2 ring-primary/30'
                            : 'border-border/50';

                        const CardContent = (
                            <div className="flex items-center w-full px-4 py-4">
                                <img
                                    src={`${BASE_URL}${item.logo}`}
                                    alt={item.name}
                                    className="w-10 h-10 object-contain flex-shrink-0"
                                />
                                <span className="text-[15px] font-medium text-foreground ml-4 flex-1">
                                    {item.name}
                                </span>
                                {item.href && (
                                    <ExternalLink className="w-[18px] h-[18px] text-muted-foreground flex-shrink-0 ml-3" />
                                )}
                            </div>
                        );

                        return item.href ? (
                            <a
                                key={item.id}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block bg-background border rounded-2xl active:bg-secondary/50 transition-colors ${highlightClass}`}
                            >
                                {CardContent}
                            </a>
                        ) : (
                            <div
                                key={item.id}
                                className={`block bg-background border rounded-2xl ${highlightClass}`}
                            >
                                {CardContent}
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

/* ──────────────────────────────────────────────
   MAIN EXPORT
   ────────────────────────────────────────────── */
export const OurInitiatives = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [initiatives, setInitiatives] = useState<Initiative[]>([]);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 767px)');
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                const active = (data.initiatives || [])
                    .filter((i: Initiative) => i.isActive)
                    .sort((a: Initiative, b: Initiative) => a.order - b.order);
                setInitiatives(active);
            })
            .catch(() => {});
    }, []);

    if (initiatives.length === 0) return null;

    if (isMobile) {
        return <MobileOurInitiatives initiatives={initiatives} />;
    }

    return <DesktopOurInitiatives initiatives={initiatives} />;
};

export default OurInitiatives;
