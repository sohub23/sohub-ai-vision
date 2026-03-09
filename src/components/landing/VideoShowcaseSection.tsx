import { useState, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { Play, Eye, ChevronLeft, ChevronRight } from "lucide-react";

type VideoMode = "youtube" | "local";

interface VideoItem {
  id: string;
  title: string;
  type: VideoMode;
}

const allVideos: VideoItem[] = [
  { id: "rSQWDez6wbA", type: "youtube", title: "SOHUB AI Vision — Live Demo" },
  { id: "/videos/face_detection.mp4", type: "local", title: "Face Recognition" },
  { id: "/videos/fall_detection.mp4", type: "local", title: "Fall Detection" },
  { id: "/videos/smoke_fire_detection.mp4", type: "local", title: "Smoke And Fire Detection" },
  { id: "/videos/phone_calling_detection.mp4", type: "local", title: "Phone Calling Detection" },
  { id: "/videos/using_phone.mp4", type: "local", title: "Phone Using Detection" },
];

const VideoShowcaseSection = () => {
  const [activeVideoId, setActiveVideoId] = useState(allVideos[0].id);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);

  const activeVideo = allVideos.find(v => v.id === activeVideoId) || allVideos[0];
  const thumbnailVideos = allVideos.filter(v => v.id !== activeVideoId);

  const handleThumbnailClick = (videoId: string) => {
    setActiveVideoId(videoId);
    if (videoFrameRef.current) {
      videoFrameRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scroll = (dir: "left" | "right") => {
    if (carouselRef.current) {
      const amount = 260;
      carouselRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6">
        <ScrollReveal>
          <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-sohub-orange mb-4">
            See It In Action
          </p>
          <h2 className="text-section-mobile md:text-section text-center text-foreground mb-4">
            Watch SOHUB AI Vision work in real time.
          </h2>
          <p className="text-center text-muted-foreground text-body-lg mb-16 max-w-xl mx-auto">
            Real deployments. Real results. No staged demos.
          </p>
        </ScrollReveal>

        {/* Main Player */}
        <ScrollReveal>
          <div ref={videoFrameRef} className="max-w-4xl mx-auto mb-8 scroll-mt-24">
            <div className="relative rounded-2xl overflow-hidden border border-border bg-secondary/30 shadow-xl">
              <div className="aspect-video">
                {activeVideo.type === "youtube" ? (
                  <iframe
                    key={`yt-${activeVideo.id}`}
                    src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&mute=1&loop=1&playlist=${activeVideo.id}&rel=0&modestbranding=1&controls=1`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <video
                    key={`local-${activeVideo.id}`}
                    title={activeVideo.title}
                    autoPlay
                    muted
                    loop
                    controls
                    playsInline
                    className="w-full h-full object-cover bg-black"
                  >
                    <source src={activeVideo.id} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/50">
                  <Eye className="w-3.5 h-3.5 text-sohub-orange" />
                  <span className="text-xs font-medium text-foreground">Now Playing</span>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-3 font-medium">{activeVideo.title}</p>
          </div>
        </ScrollReveal>

        {/* Carousel Thumbnails */}
        <div className="max-w-4xl mx-auto relative">
          {/* Scroll buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/90 border border-border shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors hidden sm:flex"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/90 border border-border shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors hidden sm:flex"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {thumbnailVideos.map((video) => (
              <motion.div
                key={video.id}
                whileHover={{ y: -4 }}
                className="group cursor-pointer flex-shrink-0 w-[240px] snap-start"
                onClick={() => handleThumbnailClick(video.id)}
              >
                <div className="relative rounded-xl overflow-hidden border border-border bg-secondary/30 hover:border-sohub-orange/30 hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video">
                    <div className="w-full h-full relative">
                      {video.type === "youtube" ? (
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                          alt={`SOHUB AI Vision demo: ${video.title}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <video
                          src={`${video.id}#t=0.1`}
                          className="w-full h-full object-cover bg-muted"
                          muted
                          playsInline
                          preload="metadata"
                        />
                      )}
                      <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center group-hover:bg-foreground/30 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-sohub-orange/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 font-medium text-center truncate">{video.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcaseSection;
