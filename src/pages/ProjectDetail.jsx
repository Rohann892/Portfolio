import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  X,
  ChevronLeft,
  ChevronRight,
  Tag,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { projects } from "../data/projects";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="text-2xl font-semibold text-muted-foreground">Project not found</p>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      </div>
    );
  }

  const openLightbox = (idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const prevLightbox = () =>
    setLightboxIndex((i) => (i - 1 + project.images.length) % project.images.length);
  const nextLightbox = () =>
    setLightboxIndex((i) => (i + 1) % project.images.length);

  const handleKeyDown = (e) => {
    if (!lightboxOpen) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevLightbox();
    if (e.key === "ArrowRight") nextLightbox();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Subtle top gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Header / Back nav */}
      <header className="sticky top-0 z-40 glass-strong border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </button>
          <span className="text-xl font-bold tracking-tight">
            AS<span className="text-primary">.</span>
          </span>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 max-w-6xl">
        {/* Hero section */}
        <div className="mb-16 animate-fade-in">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {project.description}
          </p>



          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full glass border border-border/50 font-medium hover:border-primary/50 transition-all"
              >
                <Github className="w-4 h-4" /> Source Code
              </a>
            )}
          </div>
        </div>

        {/* ─── Main Image + Thumbnails ─── */}
        <section className="mb-16 animate-fade-in animation-delay-100">
          {/* Main preview */}
          <div
            className="relative rounded-2xl overflow-hidden aspect-video mb-4 cursor-zoom-in glow-border"
            onClick={() => openLightbox(activeImage)}
          >
            <img
              src={project.images[activeImage]}
              alt={`${project.title} screenshot ${activeImage + 1}`}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 right-4 glass px-3 py-1.5 rounded-full text-xs text-muted-foreground">
              {activeImage + 1} / {project.images.length} · Click to enlarge
            </div>
          </div>

          {/* Thumbnails */}
          {project.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {project.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    activeImage === idx
                      ? "border-primary shadow-lg shadow-primary/20 scale-105"
                      : "border-border/50 opacity-60 hover:opacity-100 hover:border-primary/40"
                  }`}
                >
                  <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* ─── Features & Details grid ─── */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Features */}
          <section className="glass rounded-2xl p-8 animate-fade-in animation-delay-200">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" /> Key Features
            </h2>
            <ul className="space-y-3">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-muted-foreground text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {/* Tech stack */}
          <section className="glass rounded-2xl p-8 animate-fade-in animation-delay-300">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" /> Tech Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-xl bg-surface border border-border/50 text-sm font-medium hover:border-primary/50 hover:text-primary transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* ─── All screenshots grid ─── */}
        {project.images.length > 1 && (
          <section className="mb-16 animate-fade-in animation-delay-400">
            <h2 className="text-2xl font-bold mb-8">
              All Screenshots
              <span className="font-serif italic font-normal text-white ml-2">.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.images.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-xl overflow-hidden aspect-video cursor-zoom-in glass"
                  onClick={() => openLightbox(idx)}
                >
                  <img
                    src={img}
                    alt={`Screenshot ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <ArrowUpRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="absolute bottom-2 left-2 text-xs text-white/60 glass px-2 py-0.5 rounded-full">
                    {idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── Other Projects ─── */}
        <section className="animate-fade-in animation-delay-500">
          <h2 className="text-2xl font-bold mb-8">
            Other Projects
            <span className="font-serif italic font-normal text-white ml-2">.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects
              .filter((p) => p.id !== project.id)
              .map((p) => (
                <Link
                  key={p.id}
                  to={`/project/${p.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="group glass rounded-xl overflow-hidden flex gap-4 p-4 hover:border-primary/30 transition-all border border-border/50"
                >
                  <div className="w-28 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold group-hover:text-primary transition-colors mb-1 truncate">
                      {p.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{p.shortDescription}</p>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-full bg-surface text-xs text-muted-foreground border border-border/50">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              ))}
          </div>
        </section>
      </main>

      {/* ─── Lightbox ─── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 glass p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
            className="absolute left-4 glass p-3 rounded-full hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <img
            src={project.images[lightboxIndex]}
            alt={`Lightbox ${lightboxIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
            className="absolute right-4 glass p-3 rounded-full hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="absolute bottom-6 glass px-4 py-2 rounded-full text-sm text-white/60">
            {lightboxIndex + 1} / {project.images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
