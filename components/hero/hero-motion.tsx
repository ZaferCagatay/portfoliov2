"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { animate, motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { Pause, Play } from "lucide-react";
import { HeroMotionContext } from "@/components/hero/hero-motion-context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motionPolicy } from "@/lib/motion";

export function HeroMotion({ children, labels }: { children: ReactNode; labels: { pause: string; resume: string; reduced: string } }) {
  const ref = useRef<HTMLElement>(null);
  const entered = useRef(false);
  const [paused, setPaused] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const reduced = useReducedMotion();
  const stopped = paused || !!reduced;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useTransform(scrollYProgress, value => desktop && !stopped ? value : 0);
  const headlineY = useTransform(progress, [0, 1], ["0px", "-24px"]);
  const headlineOpacity = useTransform(progress, [0, 1], [1, 0.7]);
  const proofY = useTransform(progress, [0, 1], ["0px", "-12px"]);
  const phoneY = useTransform(progress, [0, 1], ["0px", "-20px"]);
  const fieldScale = useTransform(progress, [0, 1], [1, 0.97]);
  const fieldOpacity = useTransform(progress, [0, 1], [1, 0.45]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const pointerXPx = useTransform(pointerX, value => `${value}px`);
  const pointerYPx = useTransform(pointerY, value => `${value}px`);

  useEffect(() => {
    const root = ref.current;
    const inner = root?.querySelector<HTMLElement>(".hero-sticky");
    if (!root || !inner) return;
    root.dataset.enhanced = "true";
    document.querySelector(".site-header")?.setAttribute("data-enhanced", "true");
    const query = matchMedia(motionPolicy.desktopQuery);
    const update = () => {
      const height = inner.getBoundingClientRect().height;
      root.style.setProperty("--hero-height", `${height}px`);
      setDesktop(query.matches && height <= innerHeight);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(inner);
    query.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => { observer.disconnect(); query.removeEventListener("change", update); window.removeEventListener("resize", update); };
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root || stopped || entered.current) return;
    entered.current = true;
    // Content is visible in server HTML. Start enhancements only after mounting.
    const entries = [
      ["identity", 0.08, 10], ["headline", 0.14, 22], ["karta", 0.28, 20],
      ["pavlov", 0.4, 14], ["description", 0.48, 8], ["actions", 0.5, 8], ["editorial", 0.54, 8],
    ] as const;
    const animations = entries.flatMap(([name, delay, y]) => {
      const element = root.querySelector<HTMLElement>(`[data-enter="${name}"]`);
      if (!element) return [];
      return [animate(element, {
        opacity: [0.45, 1], y: [y, 0],
        ...(name === "headline" ? { clipPath: ["inset(0 0 12% 0)", "inset(0 0 0% 0)"] } : {}),
        ...(name === "karta" ? { scale: [0.98, 1] } : {}),
      }, { duration: motionPolicy.major, delay, ease: motionPolicy.ease })];
    });
    return () => {
      animations.forEach(animation => animation.stop());
      root.querySelectorAll<HTMLElement>("[data-enter]").forEach(element => {
        element.style.removeProperty("opacity"); element.style.removeProperty("transform"); element.style.removeProperty("clip-path");
      });
    };
  }, [stopped]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const query = matchMedia(motionPolicy.pointerQuery);
    const reset = () => { pointerX.set(0); pointerY.set(0); };
    if (stopped) { reset(); return; }
    const move = (event: PointerEvent) => {
      if (!query.matches || event.pointerType !== "mouse") return;
      const bounds = root.getBoundingClientRect();
      pointerX.set(Math.max(-6, Math.min(6, ((event.clientX - bounds.left) / bounds.width - 0.5) * 12)));
      pointerY.set(Math.max(-6, Math.min(6, ((event.clientY - bounds.top) / bounds.height - 0.5) * 12)));
    };
    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerleave", reset);
    query.addEventListener("change", reset);
    return () => { root.removeEventListener("pointermove", move); root.removeEventListener("pointerleave", reset); query.removeEventListener("change", reset); reset(); };
  }, [stopped, pointerX, pointerY]);

  return <HeroMotionContext value={{ paused: stopped, target: ref }}><motion.section ref={ref} className="hero-shell" aria-label={labels.reduced === "Reduced motion on" ? "Introduction" : "Tanıtım"} data-motion-paused={stopped} data-sticky-enabled={desktop && !reduced} style={{
    "--headline-y": headlineY, "--headline-opacity": headlineOpacity,
    "--proof-y": proofY, "--phone-y": phoneY, "--field-scale": fieldScale,
    "--field-opacity": fieldOpacity, "--pointer-x": pointerXPx, "--pointer-y": pointerYPx,
  } as CSSProperties}>
    <div className="hero-sticky">{children}
    <div className="motion-control-container container"><button className="motion-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)} disabled={!!reduced}>
      {stopped ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
      <span>{reduced ? labels.reduced : paused ? labels.resume : labels.pause}</span>
    </button></div></div>
  </motion.section></HeroMotionContext>;
}
