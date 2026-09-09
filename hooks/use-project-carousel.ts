"use client";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import useEmblaCarousel from "embla-carousel-react";

function subscribeMotion(update: () => void) {
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  const hero = document.querySelector("[data-motion-paused]");
  const observer = new MutationObserver(update);
  if (hero) observer.observe(hero, { attributes: true, attributeFilter: ["data-motion-paused"] });
  media.addEventListener("change", update);
  return () => { observer.disconnect(); media.removeEventListener("change", update); };
}
function motionStopped() {
  return matchMedia("(prefers-reduced-motion: reduce)").matches || document.querySelector('[data-motion-paused="true"]') !== null;
}
export function useProjectCarousel(count: number) {
  const stopped = useSyncExternalStore(subscribeMotion, motionStopped, () => true);
  const [viewportRef, api] = useEmblaCarousel({ align: "center", containScroll: false, slidesToScroll: 1, loop: count > 2, duration: 28 });
  const [state, setState] = useState({ selected: 0, settled: 0, enhanced: false, previous: false, next: count > 1, announced: false });
  const deliberate = useRef(false);
  useEffect(() => {
    if (!api) return;
    let alive = true;
    const sync = () => {
      const focusedSlide = document.activeElement?.closest("[data-project-slide]");
      if (focusedSlide && focusedSlide !== api.slideNodes()[api.selectedScrollSnap()]) {
        api.rootNode().closest<HTMLElement>("[data-carousel]")?.focus({ preventScroll: true });
      }
      setState(old => ({ ...old, selected: api.selectedScrollSnap(), enhanced: true, previous: api.canScrollPrev(), next: api.canScrollNext() }));
    };
    const settle = () => setState(old => ({ ...old, settled: api.selectedScrollSnap(), announced: deliberate.current }));
    const pointer = () => { deliberate.current = true; };
    const init = () => { sync(); settle(); };
    const destroy = () => setState(old => ({ ...old, enhanced: false }));
    queueMicrotask(() => { if (alive) init(); });
    api.on("select", sync).on("settle", settle).on("reInit", init).on("pointerDown", pointer).on("destroy", destroy);
    return () => { alive = false; api.off("select", sync).off("settle", settle).off("reInit", init).off("pointerDown", pointer).off("destroy", destroy); };
  }, [api]);
  useEffect(() => {
    if (api && stopped) api.scrollTo(api.selectedScrollSnap(), true);
  }, [api, stopped]);
  const navigate = useCallback((target: number | "previous" | "next") => {
    if (!api) return;
    deliberate.current = true;
    if (target === "previous") api.scrollPrev(stopped);
    else if (target === "next") api.scrollNext(stopped);
    else api.scrollTo(target, stopped);
    if (stopped) setState(old => ({ ...old, settled: api.selectedScrollSnap(), announced: true }));
  }, [api, stopped]);
  return { viewportRef, api, stopped, ...state, navigate };
}
