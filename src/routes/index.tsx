import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import {
  ShieldCheck,
  Zap,
  Cpu,
  Check,
  MessageCircle,
  ChevronDown,
  Globe,
  Sparkles,
  Star,
  LayoutGrid,
  Tv,
  BrainCircuit,
  Crown,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  STREAMING_NETWORK,
  STANDARD_NETWORK,
  VIP_NETWORK,
  type ThalexCategory,
  type ThalexService,
} from "@/lib/thalex-data";
import { buildGeneralContactLink, categoryLabel, getWhatsAppDisplay } from "@/lib/thalex-utils";
import { BaseButton } from "@/components/thalex/BaseButton";
import { CardBorder } from "@/components/thalex/CardBorder";
import { Button } from "@/components/ui/button";

const LogoBubbles = lazy(() =>
  import("@/components/thalex/LogoBubbles").then((m) => ({ default: m.LogoBubbles })),
);
const TechSupportFab = lazy(() =>
  import("@/components/thalex/TechSupportFab").then((m) => ({ default: m.TechSupportFab })),
);
const ActivationModal = lazy(() =>
  import("@/components/thalex/ActivationModal").then((m) => ({ default: m.ActivationModal })),
);

type Category = "All" | ThalexCategory;
const CATEGORIES: readonly Category[] = ["All", "Streaming", "IA"] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thalex — Streaming & IA Premium en Ecuador" },
      {
        name: "description",
        content:
          "Suscripciones premium a Netflix, Disney+, Max, ChatGPT Plus y Gemini con entrega inmediata, cuentas privadas y soporte 24/7 en Ecuador.",
      },
      { property: "og:title", content: "Thalex — Streaming & IA Premium" },
      {
        property: "og:description",
        content: "Tu bóveda digital de entretenimiento y herramientas IA. Entrega en minutos.",
      },
    ],
  }),
  component: ThalexApp,
});

function ThalexApp() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedApp, setSelectedApp] = useState<ThalexService | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredNetwork =
    activeCategory === "All"
      ? STANDARD_NETWORK
      : STANDARD_NETWORK.filter((item) => item.category === activeCategory);

  const handleCategory = (cat: Category) => {
    if (cat === activeCategory) return;
    setActiveCategory(cat);
    const count =
      cat === "All"
        ? STANDARD_NETWORK.length
        : STANDARD_NETWORK.filter((i) => i.category === cat).length;
    toast(`${categoryLabel(cat)}`, {
      description: `${count} servicio${count === 1 ? "" : "s"} disponibles.`,
    });
  };

  return (
    <main className="min-h-screen text-foreground overflow-x-hidden relative">
      {/* Global background layers */}
      <div className="fixed inset-0 -z-20 bg-background" aria-hidden />
      <div
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 18% 22%, oklch(0.45 0.22 300 / 0.22), transparent 60%), radial-gradient(55% 45% at 82% 78%, oklch(0.5 0.2 285 / 0.20), transparent 60%), radial-gradient(40% 35% at 50% 50%, oklch(0.86 0.18 200 / 0.10), transparent 70%)",
        }}
        aria-hidden
      />
      <Suspense fallback={null}>
        <LogoBubbles />
      </Suspense>

      <Suspense fallback={null}>
        <ActivationModal app={selectedApp} onClose={() => setSelectedApp(null)} />
      </Suspense>

      {/* Navbar */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[90] px-4 sm:px-8 md:px-12 flex items-center justify-between border-b border-border/60 transition-all duration-300",
          scrolled ? "bg-background/80 backdrop-blur-xl py-3" : "bg-transparent py-5",
        )}
      >
        <a href="#hero" className="flex items-center gap-2 group">
          <Globe className="w-6 h-6 text-brand transition-transform group-hover:rotate-180 duration-700" aria-hidden />
          <span className="font-mono text-xl font-bold tracking-tighter text-foreground uppercase flex items-center gap-1">
            THALEX
            <span className="w-1.5 h-1.5 bg-brand rounded-full shadow-glow animate-pulse" aria-hidden />
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 font-mono text-sm tracking-widest uppercase text-muted-foreground">
          <a href="#hero" className="hover:text-brand transition-colors">Inicio</a>
          <a href="#about" className="hover:text-brand transition-colors">Quiénes Somos</a>
          <a href="#vault" className="hover:text-brand transition-colors">Catálogo</a>
          <a href="#protocol" className="hover:text-brand transition-colors">Garantía</a>
        </div>

        <div className="hidden sm:flex items-center gap-3 glass px-4 py-2 rounded-full">
          <Star className="w-3.5 h-3.5 text-brand fill-brand" aria-hidden />
          <span className="font-mono text-xs text-foreground uppercase tracking-wider">
            +99 CLIENTES ACTIVOS
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 bg-hero-radial pointer-events-none" aria-hidden />
        <div className="absolute inset-0 z-0 bg-cyber-grid pointer-events-none opacity-60" aria-hidden />

        {/* Floating orbs */}
        <div
          className="absolute top-[15%] left-[8%] w-40 h-40 rounded-full bg-brand/30 blur-3xl animate-float pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute bottom-[20%] right-[10%] w-56 h-56 rounded-full bg-purple/25 blur-3xl animate-float-slow pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute top-[40%] right-[25%] w-32 h-32 rounded-full bg-gold/25 blur-3xl animate-float pointer-events-none"
          aria-hidden
        />

        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8 glass px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-widest text-cyan border-cyan/30"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_var(--cyan)]" aria-hidden />
            <Sparkles className="w-3.5 h-3.5" />
            Activación inmediata · 100% garantizado
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(2.75rem,9vw,8rem)] text-foreground mb-6 font-mono tracking-tighter uppercase leading-[0.85]"
          >
            <span className="text-glow">TU ENTRETENIMIENTO.</span>
            <br />
            <span className="text-holo">SIN LÍMITES.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mb-10 font-light leading-relaxed"
          >
            Accede a las mejores plataformas de streaming globales sin bloqueos ni complicaciones.
            Nodos oficiales y verificados con entrega inmediata en todo el Ecuador.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <BaseButton
              className="shimmer"
              onClick={() =>
                document.getElementById("vault")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explorar Catálogo
              <Zap className="w-5 h-5" />
            </BaseButton>
            <BaseButton
              variant="ghost"
              onClick={() =>
                document.getElementById("protocol")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Cómo Funciona
            </BaseButton>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-4 sm:gap-10 max-w-2xl w-full"
          >
            {HERO_STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center">
                <div className="font-mono text-2xl sm:text-4xl font-bold text-glow text-foreground">
                  {s.value}
                </div>
                <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-muted-foreground font-mono text-xs tracking-widest uppercase"
        >
          DESPLAZAR HACIA ABAJO
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* Brand marquee */}
      <section
        aria-label="Plataformas disponibles"
        className="relative py-6 border-y border-border bg-surface/60 backdrop-blur overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent"
          aria-hidden
        />
        <div className="flex marquee-track w-max gap-16 items-center">
          {[...STREAMING_NETWORK, ...STREAMING_NETWORK].map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="rounded-lg px-3 py-2 flex items-center justify-center h-10 sm:h-12 w-20 sm:w-24 bg-gradient-to-br from-white via-white/95 to-cyan-soft border border-brand/25 opacity-85 hover:opacity-100 transition-all duration-300 shadow-[inset_0_1px_0_oklch(1_0_0/0.6),0_2px_14px_oklch(0.86_0.18_200/0.25)]"
            >
              <img
                src={item.logoUrl}
                alt={item.name}
                loading="lazy"
                className="h-5 sm:h-6 w-full object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="py-24 md:py-32 relative z-10 bg-surface/70 backdrop-blur-sm border-b border-border overflow-hidden"
      >
        {/* Ambient orbs */}
        <div
          className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-brand/10 blur-3xl pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute -bottom-40 right-0 w-[460px] h-[460px] rounded-full bg-purple/12 blur-3xl pointer-events-none"
          aria-hidden
        />

        <div className="container mx-auto px-6 relative">
          {/* Section header rail */}
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-brand">
              01 / Sobre Thalex
            </span>
            <span className="flex-1 h-px bg-gradient-to-r from-brand/60 via-purple-soft/40 to-transparent" />
            <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              EST. Ecuador
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: editorial copy */}
            <div className="lg:col-span-7 relative">
              {/* Vertical accent rail */}
              <div className="absolute -left-6 top-2 bottom-2 w-px bg-gradient-to-b from-brand via-purple-soft/60 to-transparent hidden md:block" />

              <h2 className="text-4xl md:text-6xl font-mono font-bold uppercase tracking-tighter text-foreground mb-8 leading-[0.95]">
                Tu bóveda digital
                <br />
                <span className="text-muted-foreground/70">de</span>{" "}
                <span className="text-holo">confianza</span>
                <span className="text-brand">.</span>
              </h2>

              <p className="text-foreground/85 text-base md:text-lg mb-5 leading-relaxed max-w-xl">
                La plataforma líder en distribución de{" "}
                <span className="text-brand font-medium">entretenimiento digital premium</span> en
                Ecuador. Nacimos para eliminar las barreras tecnológicas y financieras — acceso
                seguro, rápido y garantizado a tus series, películas y deportes favoritos.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl mb-8">
                Sin tarjetas de crédito. Sin contratos forzosos. Con un equipo de soporte que
                respalda tu entretenimiento 24/7.
              </p>

            </div>

            {/* Right: refined feature stack */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <FeatureTile
                index="01"
                icon={<Zap className="w-5 h-5 text-brand" />}
                title="Entrega en 2 Minutos"
                body="Activación ultrarrápida de tu servicio."
              />
              <FeatureTile
                index="02"
                icon={<MessageCircle className="w-5 h-5 text-whatsapp" />}
                title="Soporte humano 24/7"
                body="Agentes reales en WhatsApp, siempre disponibles."
                accent="whatsapp"
                className="md:ml-8"
              />
              <FeatureTile
                index="03"
                icon={<ShieldCheck className="w-5 h-5 text-brand" />}
                title="Garantía de Renovación"
                body="No pierdas tus perfiles. Continuidad mes a mes asegurada."
              />
            </div>
          </div>
        </div>
      </section>


      {/* Vault — VIP */}
      <section id="vault" className="py-20 md:py-28 relative z-10 overflow-hidden">
        <div
          className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-gold/15 blur-3xl pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-purple/15 blur-3xl pointer-events-none"
          aria-hidden
        />
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-12 md:mb-16">
            <span className="font-mono text-[11px] uppercase tracking-widest text-gold mb-4 inline-flex items-center gap-2 text-gold-glow">
              <Crown className="w-3.5 h-3.5" />
              — Servicios VIP · Premium Gold
            </span>
            <h2 className="text-3xl md:text-5xl font-mono font-bold uppercase tracking-tighter text-foreground mb-4">
              Los <span className="text-gold-holo">Top 4</span> de Thalex.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-center">
              Nuestras suscripciones más solicitadas, con prioridad de soporte y la mejor relación
              calidad-precio del mercado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {VIP_NETWORK.map((item) => (
              <VipCard key={item.id} item={item} onSelect={() => setSelectedApp(item)} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust banner */}
      <section aria-label="Garantía Thalex" className="relative z-10 -mt-4 mb-4">
        <div className="container mx-auto px-6">
          <div className="relative max-w-4xl mx-auto rounded-md border border-brand/40 bg-surface/70 backdrop-blur-xl px-6 py-5 sm:py-6 text-center overflow-hidden shadow-glow">
            <div
              className="absolute -top-12 left-1/2 -translate-x-1/2 w-[420px] h-[200px] bg-brand/20 blur-3xl rounded-full pointer-events-none"
              aria-hidden
            />
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 font-mono text-sm sm:text-base uppercase tracking-widest text-foreground">
                <ShieldCheck className="w-5 h-5 text-brand" />
                <span className="text-glow">Todos los perfiles tienen garantía</span>
              </div>
              <a
                href={buildGeneralContactLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-whatsapp/50 bg-whatsapp/10 hover:bg-whatsapp/20 transition-colors font-mono text-sm text-foreground"
              >
                <MessageCircle className="w-4 h-4 text-whatsapp" />
                {getWhatsAppDisplay()}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Vault — Catálogo general */}
      <section id="catalogo" className="py-16 md:py-24 relative z-10 overflow-hidden">
        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-brand mb-4 inline-block">
                — Catálogo General
              </span>
              <h2 className="text-3xl md:text-5xl font-mono font-bold uppercase tracking-tighter text-foreground mb-4">
                Todo el <span className="text-holo">Catálogo.</span>
              </h2>
              <p className="text-muted-foreground max-w-xl text-justify">
                Perfiles privados con garantía. Selecciona tu plataforma y activa en minutos por
                WhatsApp.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Filtrar por categoría"
              className="flex flex-wrap gap-2 p-1.5 glass rounded-lg"
            >
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat;
                const count =
                  cat === "All"
                    ? STANDARD_NETWORK.length
                    : STANDARD_NETWORK.filter((i) => i.category === cat).length;
                const Icon = cat === "All" ? LayoutGrid : cat === "Streaming" ? Tv : BrainCircuit;
                const fullLabel =
                  cat === "All"
                    ? "Todos los servicios"
                    : cat === "Streaming"
                      ? "Streaming & TV"
                      : "Apps & IA";
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={active}
                    aria-label={`${fullLabel} (${count})`}
                    onClick={() => handleCategory(cat)}
                    className="relative px-4 py-2.5 font-mono text-xs sm:text-sm uppercase tracking-wider rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {active && (
                      <motion.span
                        layoutId="activeTab"
                        className="absolute inset-0 bg-brand-soft border border-brand/60 rounded-md z-0 shadow-glow"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-10 flex items-center gap-2 transition-colors",
                        active ? "text-brand" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{fullLabel}</span>
                      <span className="sm:hidden">{categoryLabel(cat)}</span>
                      <span
                        className={cn(
                          "ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold tabular-nums border",
                          active
                            ? "bg-brand text-brand-foreground border-brand"
                            : "bg-surface-2 text-foreground/70 border-border",
                        )}
                      >
                        {count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredNetwork.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                >
                  <CardBorder>
                    <span
                      className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t border-l border-purple/70"
                      aria-hidden
                    />
                    <span
                      className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b border-r border-purple/70"
                      aria-hidden
                    />

                    <div className="p-6 sm:p-7 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-5">
                        <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 border rounded-sm text-brand border-brand/40 bg-brand-soft">
                          {item.unit}
                        </span>
                        <div className="rounded-lg p-2.5 flex items-center justify-center w-16 h-14 bg-gradient-to-br from-white via-white/95 to-cyan-soft border border-brand/30 shadow-[inset_0_1px_0_oklch(1_0_0/0.6),0_4px_18px_oklch(0.70_0.27_305/0.3)] transition-transform duration-500 group-hover:scale-110 group-hover:border-brand/60">
                          <img
                            src={item.logoUrl}
                            alt={`${item.name} logo`}
                            loading="lazy"
                            className="h-8 w-full object-contain"
                          />
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-mono font-bold text-foreground uppercase tracking-tight mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="text-3xl font-light text-foreground mb-5 flex items-baseline gap-2">
                        <span className="text-glow">{item.price}</span>
                        <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                          {item.unit}
                        </span>
                      </div>

                      <ul className="space-y-3 mb-6 flex-grow">
                        {item.features.map((feat) => (
                          <li
                            key={feat}
                            className="flex items-start gap-3 text-sm text-muted-foreground"
                          >
                            <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-soft border border-brand/40 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 text-brand" />
                            </span>
                            {feat}
                          </li>
                        ))}
                      </ul>

                      <Button
                        variant="brand"
                        size="lg"
                        className="w-full shimmer"
                        onClick={() => setSelectedApp(item)}
                      >
                        <Zap className="w-5 h-5" />
                        Adquirir
                      </Button>
                    </div>
                  </CardBorder>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>


      {/* Protocol */}
      <section
        id="protocol"
        className="py-24 md:py-32 relative bg-surface/70 backdrop-blur-sm border-y border-border overflow-hidden"
      >
        <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" aria-hidden />
        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="text-center mb-16 md:mb-24">
            <span className="font-mono text-[11px] uppercase tracking-widest text-brand mb-4 inline-block">
              — Protocolo
            </span>
            <h2 className="text-3xl md:text-5xl font-mono font-bold uppercase tracking-tighter text-foreground mb-4">
              Cómo <span className="text-holo">Funciona.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-justify">
              Un proceso simple, seguro y rápido para que empieces a disfrutar sin fricciones.
            </p>
          </div>

          <div className="relative">
            <div
              className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px z-0"
              aria-hidden
            >
              <div className="w-full h-full bg-gradient-to-r from-transparent via-purple/60 to-transparent" />
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-brand/40 to-transparent blur-sm" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 relative z-10">
              {PROTOCOL_STEPS.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative flex flex-col items-center text-center group bg-surface-2/70 backdrop-blur-md p-8 sm:p-10 border border-purple/30 rounded-xl hover:border-purple hover:-translate-y-1 hover:shadow-[0_20px_60px_oklch(0.55_0.22_300/0.35)] transition-all duration-500 overflow-hidden"
                >
                  {/* Gradient corner glows */}
                  <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-purple/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden />
                  <div className="pointer-events-none absolute -bottom-20 -left-16 w-52 h-52 rounded-full bg-brand/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden />

                  {/* Giant step number watermark */}
                  <div
                    className="pointer-events-none absolute top-2 right-3 font-mono font-black leading-none select-none text-[88px] sm:text-[110px] tracking-tighter"
                    style={{
                      background:
                        "linear-gradient(160deg, oklch(0.65 0.25 300 / 0.35), oklch(0.86 0.18 200 / 0.15) 60%, transparent)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                    aria-hidden
                  >
                    {item.step}
                  </div>

                  <div className="relative w-24 h-24 rounded-full bg-surface border border-purple/40 flex items-center justify-center mb-6 group-hover:border-purple group-hover:scale-105 transition-all duration-500 shadow-[inset_0_0_20px_oklch(0.55_0.22_300/0.2)]">
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.22_300/0.4),transparent_70%)] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -inset-2 rounded-full border border-purple/30 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity" />
                    {item.icon}
                  </div>
                  <div className="font-mono text-[10px] text-purple-soft mb-2 uppercase tracking-[0.3em] inline-flex items-center gap-2">
                    <span className="w-4 h-px bg-purple-soft/60" />
                    Paso {item.step}
                    <span className="w-4 h-px bg-purple-soft/60" />
                  </div>
                  <h3 className="text-xl font-mono text-foreground uppercase tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-[260px] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial pointer-events-none" aria-hidden />
        <div className="container mx-auto px-6 relative">
          <div className="relative max-w-4xl mx-auto rounded-2xl border border-purple/50 bg-surface/80 backdrop-blur-xl p-10 sm:p-16 text-center overflow-hidden shadow-[0_30px_90px_oklch(0.55_0.22_300/0.45)]">
            {/* Layered halos */}
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-brand/25 blur-3xl rounded-full pointer-events-none"
              aria-hidden
            />
            <div
              className="absolute -bottom-40 left-1/4 w-[420px] h-[280px] bg-purple/35 blur-3xl rounded-full pointer-events-none"
              aria-hidden
            />
            <div
              className="absolute -bottom-32 right-1/4 w-[360px] h-[240px] bg-gold/15 blur-3xl rounded-full pointer-events-none"
              aria-hidden
            />
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" aria-hidden />

            {/* Corner brackets */}
            <span className="pointer-events-none absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-purple/70 rounded-tl-lg" aria-hidden />
            <span className="pointer-events-none absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-purple/70 rounded-tr-lg" aria-hidden />
            <span className="pointer-events-none absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-purple/70 rounded-bl-lg" aria-hidden />
            <span className="pointer-events-none absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-purple/70 rounded-br-lg" aria-hidden />

            <div className="relative">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-purple/40 bg-purple/10 backdrop-blur">
                <Sparkles className="w-3.5 h-3.5 text-purple-soft" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-purple-soft">
                  Activación instantánea
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-mono font-bold uppercase tracking-tighter mb-6 leading-tight">
                ¿Listo para <span className="text-holo">entrar al sistema</span>?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-10">
                Activamos tu cuenta en menos de 2 minutos. Habla con un agente real y
                empieza a disfrutar hoy mismo.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild variant="whatsapp" size="xl" className="shimmer">
                  <a href={buildGeneralContactLink()} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5" />
                    Activar por WhatsApp
                  </a>
                </Button>
                <Button
                  variant="ghost-brand"
                  size="xl"
                  onClick={() =>
                    document.getElementById("vault")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Ver Catálogo
                </Button>
              </div>

              {/* Trust mini bar */}
              <div className="mt-10 pt-6 border-t border-purple/20 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                <span className="inline-flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-brand" />Garantía 24/7</span>
                <span className="inline-flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-purple-soft" />Activación &lt; 2 min</span>
                <span className="inline-flex items-center gap-2"><Star className="w-3.5 h-3.5 text-gold" />+99 Clientes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple/30 bg-background/85 backdrop-blur-sm py-14 md:py-20 relative z-10 overflow-hidden">
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-purple/15 blur-3xl rounded-full"
          aria-hidden
        />
        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-12">
            {/* Brand col */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-6 h-6 text-brand" aria-hidden />
                <span className="font-mono text-2xl font-bold tracking-tighter text-foreground uppercase flex items-center gap-1">
                  THALEX
                  <span className="w-1.5 h-1.5 bg-brand rounded-full shadow-glow" aria-hidden />
                </span>
              </div>
              <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                Streaming Premium · Suscripciones IA. Entrega inmediata, perfiles privados y
                garantía 24/7.
              </p>
            </div>

            {/* Contact col */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-purple-soft mb-4 inline-flex items-center gap-2">
                <span className="w-4 h-px bg-purple-soft/60" /> Contacto
              </h4>
              <ul className="space-y-2.5 font-mono text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-whatsapp" />
                  <a
                    href={buildGeneralContactLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    WhatsApp {getWhatsAppDisplay()}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-brand" />
                  <span>www.thalexec.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-brand" />
                  <a href="mailto:ventas@thalexec.com" className="hover:text-foreground transition-colors">
                    ventas@thalexec.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Support col */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-purple-soft mb-4 inline-flex items-center gap-2">
                <span className="w-4 h-px bg-purple-soft/60" /> Servicio Técnico
              </h4>
              <ul className="space-y-2.5 font-mono text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-whatsapp" />
                  <a
                    href={buildGeneralContactLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    WhatsApp Soporte
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-soft" />
                  <a
                    href="mailto:serviciotecnico@thalexec.com"
                    className="hover:text-foreground transition-colors break-all"
                  >
                    serviciotecnico@thalexec.com
                  </a>
                </li>
                <li className="text-muted-foreground/70">Respuesta &lt; 15 min · 24/7</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-purple/20 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
            <span>© {new Date().getFullYear()} Thalex · Quito, Ecuador</span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse shadow-glow" />
              Sistema operativo · Online
            </span>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <Button
        asChild
        variant="whatsapp"
        size="iconLg"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100] shadow-[0_0_30px_oklch(0.72_0.18_145/0.6)]"
      >
        <a href={buildGeneralContactLink()} target="_blank" rel="noopener noreferrer">
          <span
            className="absolute inset-0 rounded-full bg-whatsapp/60 animate-ping"
            aria-hidden
          />
          <MessageCircle className="!w-7 !h-7 relative" />
        </a>
      </Button>
      <Suspense fallback={null}>
        <TechSupportFab />
      </Suspense>
    </main>
  );
}

interface FeatureTileProps {
  icon: ReactNode;
  title: string;
  body: string;
  className?: string;
  accent?: "brand" | "whatsapp";
  index?: string;
}

function FeatureTile({ icon, title, body, className, accent = "brand", index }: FeatureTileProps) {
  return (
    <div
      className={cn(
        "relative bg-surface-2/80 backdrop-blur-md border border-border p-5 sm:p-6 rounded-md transition-all duration-300 group hover:-translate-y-1 overflow-hidden",
        accent === "whatsapp"
          ? "hover:border-whatsapp/50 hover:shadow-[0_0_24px_oklch(0.72_0.18_145/0.3)]"
          : "hover:border-brand/60 hover:shadow-glow",
        className,
      )}
    >
      {/* Accent rail */}
      <span
        className={cn(
          "absolute left-0 top-4 bottom-4 w-px transition-all duration-300 group-hover:w-[2px]",
          accent === "whatsapp"
            ? "bg-gradient-to-b from-whatsapp via-whatsapp/40 to-transparent"
            : "bg-gradient-to-b from-brand via-purple-soft/40 to-transparent",
        )}
        aria-hidden
      />
      {/* Index watermark */}
      {index && (
        <span
          className="pointer-events-none absolute -top-2 right-3 font-mono text-5xl sm:text-6xl font-bold text-foreground/[0.04] select-none"
          aria-hidden
        >
          {index}
        </span>
      )}
      <div className="relative flex items-start gap-3">
        <span
          className={cn(
            "inline-flex w-9 h-9 items-center justify-center rounded-md border shrink-0 transition-transform group-hover:scale-110",
            accent === "whatsapp"
              ? "bg-whatsapp/10 border-whatsapp/40"
              : "bg-brand/10 border-brand/40",
          )}
        >
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-mono text-foreground uppercase tracking-tight mb-1">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{body}</p>
        </div>
      </div>
    </div>
  );
}


interface VipCardProps {
  item: ThalexService;
  onSelect: () => void;
}

function VipCard({ item, onSelect }: VipCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-lg border-2 border-gold/60 bg-surface/70 backdrop-blur-xl shadow-gold-strong hover:-translate-y-2 hover:border-gold transition-all duration-500 overflow-hidden conic-border conic-border-gold"
    >
      {/* Gold halo */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[200px] bg-gold/30 blur-3xl rounded-full"
        aria-hidden
      />
      {/* Subtle purple under-glow */}
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[360px] h-[180px] bg-purple/20 blur-3xl rounded-full"
        aria-hidden
      />
      {/* VIP badge */}
      <div className="absolute top-4 right-4 z-20 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-glow text-[oklch(0.18_0.05_70)] font-mono text-[10px] uppercase tracking-widest shadow-gold border border-gold-glow/60">
        <Crown className="w-3 h-3" />
        VIP
      </div>
      {/* Corner accents */}
      <span className="pointer-events-none absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold" aria-hidden />
      <span className="pointer-events-none absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold" aria-hidden />

      <div className="relative p-7 sm:p-9 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-6">
          <div className="rounded-lg p-3 flex items-center justify-center w-24 h-20 bg-gradient-to-br from-white via-white/95 to-gold-soft border border-gold/50 shadow-[inset_0_1px_0_oklch(1_0_0/0.6),0_6px_24px_oklch(0.82_0.16_85/0.5)] transition-transform duration-500 group-hover:scale-105">
            <img
              src={item.logoUrl}
              alt={`${item.name} logo`}
              loading="lazy"
              className="h-12 w-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-mono font-bold text-foreground uppercase tracking-tight leading-none">
              {item.name}
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-widest text-gold mt-2 inline-block">
              {item.category}
            </span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{item.description}</p>

        {item.highlight && (
          <div className="flex items-start gap-3 rounded-md border border-gold/50 bg-gold-soft p-3 mb-5">
            <Database className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <p className="text-sm font-mono text-foreground leading-snug">{item.highlight}</p>
          </div>
        )}

        {item.tiers && item.tiers.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 mb-6">
            {item.tiers.map((tier) => (
              <div
                key={tier.label}
                className="rounded-md border border-border bg-surface-2 p-3 text-center font-mono hover:border-gold/70 transition-colors"
              >
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {tier.label}
                </div>
                <div className="text-xl font-bold text-gold-glow text-foreground">{tier.price}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-4xl sm:text-5xl font-light text-foreground mb-6 flex items-baseline gap-2">
            <span className="text-gold-glow">{item.price}</span>
            <span className="text-[11px] text-muted-foreground font-mono uppercase tracking-widest">
              {item.unit}
            </span>
          </div>
        )}

        <ul className="space-y-2.5 mb-7 flex-grow">
          {item.features.map((feat) => (
            <li
              key={feat}
              className="flex items-start gap-3 text-sm text-foreground/90"
            >
              <span className="mt-0.5 w-5 h-5 rounded-full bg-gold-soft border border-gold/50 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gold" />
              </span>
              {feat}
            </li>
          ))}
        </ul>

        <Button
          size="lg"
          className="w-full shimmer bg-gradient-to-r from-gold-deep via-gold to-gold-glow text-[oklch(0.15_0.05_70)] hover:brightness-110 border border-gold-glow/70 shadow-gold font-mono uppercase tracking-widest"
          onClick={onSelect}
        >
          <Crown className="w-5 h-5" />
          Adquirir VIP
        </Button>
      </div>
    </motion.div>
  );
}

const HERO_STATS = [
  { value: "+99", label: "Clientes" },
  { value: "2 min", label: "Activación" },
  { value: "24/7", label: "Soporte" },
] as const;

const PROTOCOL_STEPS = [
  {
    step: "01",
    title: "Elige tu Plataforma",
    desc: "Selecciona el servicio que deseas de nuestro catálogo premium.",
    icon: <Cpu className="w-8 h-8 text-brand" />,
  },
  {
    step: "02",
    title: "Pago Seguro",
    desc: "Realiza tu pago de forma segura vía Pichincha, Guayaquil o MiVecino.",
    icon: <ShieldCheck className="w-8 h-8 text-brand" />,
  },
  {
    step: "03",
    title: "Acceso Inmediato",
    desc: "Recibe tus accesos directamente en tu WhatsApp en cuestión de minutos.",
    icon: <Zap className="w-8 h-8 text-brand" />,
  },
] as const;
