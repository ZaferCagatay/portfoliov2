"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SonarGridProps extends React.ComponentProps<"div"> {
  /** Manual pause, in addition to the system preference. */
  paused?: boolean
  /** Canvas resolution budget, capped at 2. */
  maxDpr?: number
  /** Hero ancestor for passive pointer events without an overlay blocking links. */
  interactionTarget?: React.RefObject<HTMLElement | null>
  /** Distance between dots in CSS pixels. */
  spacing?: number
  /** Dot radius at rest, in CSS pixels. */
  dotRadius?: number
  /** Resting dot opacity (0–1). Dots on a wavefront go to 1. */
  baseOpacity?: number
  /** Any CSS color. Defaults to the theme's primary color, so it adapts to light/dark and brand themes. */
  color?: string
  /** Seconds between ambient pings. Set 0 to disable them. */
  pingEvery?: number
  /** Wavefront speed in CSS pixels per second. */
  speed?: number
  /** Thickness of the wavefront in CSS pixels. */
  ringWidth?: number
  /** How much a dot grows at the wave peak (0 = no growth, 2 = triple size). */
  amplitude?: number
  /** Emit a ping where the user taps or clicks. */
  interactive?: boolean
  /** Maximum simultaneous rings. Older rings are dropped first. */
  maxRings?: number
  /** Start with one ring already mid-expansion so the very first frame shows the idea. */
  seedPing?: boolean
  /** Where ambient pings (and the seed ping) may spawn, as fractions of width/height: [x0, y0, x1, y1]. */
  pingArea?: [number, number, number, number]
}

interface Ring {
  x: number
  y: number
  born: number
  ambient: boolean
}

const MAX_DPR = 2
const TAU = Math.PI * 2

/**
 * SonarGrid — a decorative dot field that answers taps with expanding rings.
 * Canvas-based and theme-aware (it reads the resolved `text-primary` color), it idles
 * when no ring is alive, pauses off-screen and in hidden tabs, and renders a still grid
 * under `prefers-reduced-motion`. Children render on top of the field.
 */
export function SonarGrid({
  paused = false,
  maxDpr = MAX_DPR,
  interactionTarget,
  spacing = 26,
  dotRadius = 1.4,
  baseOpacity = 0.28,
  color,
  pingEvery = 2.4,
  speed = 260,
  ringWidth = 90,
  amplitude = 2.2,
  interactive = true,
  maxRings = 6,
  seedPing = true,
  pingArea = [0.15, 0.2, 0.85, 0.8],
  className,
  children,
  ref,
  ...rest
}: SonarGridProps) {
  const hostRef = React.useRef<HTMLDivElement | null>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const ringsRef = React.useRef<Ring[]>([])
  const refreshRef = React.useRef<() => void>(() => {})

  // The render loop reads props through this ref so knob changes apply live without restarting it.
  const opts = React.useRef({ paused, maxDpr, spacing, dotRadius, baseOpacity, pingEvery, speed, ringWidth, amplitude, interactive, maxRings, seedPing, pingArea })


  const setHost = React.useCallback(
    (node: HTMLDivElement | null) => {
      hostRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  React.useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return
    let ctx: CanvasRenderingContext2D | null
    try { ctx = canvas.getContext("2d") } catch { return }
    if (!ctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let width = 0
    let height = 0
    let raf = 0
    let timer = 0
    let visible = true
    let seeded = false
    let stroke = ""
    let clock = 0, lastFrame = 0
    let nextPing = opts.current.pingEvery * 1000
    let points: [number, number][] = []
    let dprQuery: MediaQueryList | null = null
    const stopped = () => reduceMotion.matches || opts.current.paused
    const cancel = () => {
      cancelAnimationFrame(raf); window.clearTimeout(timer)
      raf = 0; timer = 0; lastFrame = 0
    }
    const cachePoints = () => {
      const spacing = Math.max(8, opts.current.spacing)
      const cols = Math.ceil(width / spacing) + 1, rows = Math.ceil(height / spacing) + 1
      const offsetX = (width - (cols - 1) * spacing) / 2, offsetY = (height - (rows - 1) * spacing) / 2
      points = []
      for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) points.push([offsetX + i * spacing, offsetY + j * spacing])
    }

    const readColor = () => {
      stroke = getComputedStyle(canvas).color
    }

    const addRing = (x: number, y: number, born: number, ambient = false) => {
      const rings = ringsRef.current
      if (ambient && rings.filter(r => r.ambient).length >= 2) return
      rings.push({ x, y, born, ambient })
      while (rings.length > Math.max(1, Math.min(12, opts.current.maxRings))) rings.shift()
    }

    const draw = (now: number) => {
      const o = opts.current
      const lifetime = (Math.hypot(width, height) + o.ringWidth) / o.speed // seconds until a ring leaves the canvas
      ringsRef.current = ringsRef.current.filter((r) => (now - r.born) / 1000 < lifetime)
      const live = ringsRef.current.map((r) => {
        const age = (now - r.born) / 1000
        const radius = age * o.speed
        return { x: r.x, y: r.y, radius, reach: radius + o.ringWidth, fade: 1 - age / lifetime }
      })

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = stroke

      // Pass 1: every resting dot in a single path and a single fill.
      const hot: number[] = []
      ctx.globalAlpha = o.baseOpacity
      ctx.beginPath()
      for (const [cx, cy] of points) {
          let energy = 0
          for (const r of live) {
            if (Math.abs(cx - r.x) > r.reach || Math.abs(cy - r.y) > r.reach) continue
            const dist = Math.abs(Math.hypot(cx - r.x, cy - r.y) - r.radius)
            if (dist >= o.ringWidth) continue
            const t = 1 - dist / o.ringWidth
            const k = t * t * (3 - 2 * t) * r.fade // smoothstep, fading with age
            if (k > energy) energy = k
          }
          if (energy < 0.01) {
            ctx.moveTo(cx + o.dotRadius, cy)
            ctx.arc(cx, cy, o.dotRadius, 0, TAU)
          } else {
            hot.push(cx, cy, energy)
          }
      }
      ctx.fill()

      // Pass 2: only the dots on a wavefront get their own alpha and radius.
      for (let k = 0; k < hot.length; k += 3) {
        const energy = hot[k + 2] ?? 0
        ctx.globalAlpha = o.baseOpacity + (1 - o.baseOpacity) * energy
        ctx.beginPath()
        ctx.arc(hot[k] ?? 0, hot[k + 1] ?? 0, o.dotRadius * (1 + o.amplitude * energy), 0, TAU)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      host.dataset.canvasReady = "true"
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      const dpr = Math.min(window.devicePixelRatio || 1, Math.max(1, Math.min(MAX_DPR, opts.current.maxDpr)))
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cachePoints()
      if (!seeded) {
        // One ring already mid-expansion inside the ping area, so the first paint (and the cover) shows the idea.
        seeded = true
        const [x0, y0, x1, y1] = opts.current.pingArea
        if (opts.current.seedPing && !stopped())
          addRing(width * (x0 + (x1 - x0) * 0.68), height * (y0 + (y1 - y0) * 0.34), clock - 500, true)
      }
      draw(clock)
    }

    const scheduleIdle = (delay: number) => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => { timer = 0; clock = nextPing; tick(performance.now()) }, Math.max(16, delay))
      lastFrame = 0
    }

    const tick = (now: number) => {
      raf = 0
      if (!visible || document.hidden) return
      if (stopped()) {
        ringsRef.current = []
        draw(clock)
        return
      }
      if (lastFrame) clock += Math.min(50, Math.max(0, now - lastFrame))
      lastFrame = now
      const o = opts.current
      if (o.pingEvery > 0 && clock >= nextPing) {
        const [x0, y0, x1, y1] = o.pingArea
        addRing(width * (x0 + Math.random() * (x1 - x0)), height * (y0 + Math.random() * (y1 - y0)), clock, true)
        nextPing = clock + o.pingEvery * 1000
      }
      draw(clock)
      if (ringsRef.current.length > 0) raf = requestAnimationFrame(tick)
      else if (o.pingEvery > 0) scheduleIdle(nextPing - clock)
    }

    const wake = () => {
      if (!visible || document.hidden || stopped()) return
      if (!raf) {
        window.clearTimeout(timer)
        raf = requestAnimationFrame(tick)
      }
    }

    refreshRef.current = () => {
      cancel(); readColor()
      if (stopped()) ringsRef.current = []
      nextPing = clock + opts.current.pingEvery * 1000
      resize(); wake()
    }

    const onDown = (e: PointerEvent) => {
      if (!opts.current.interactive || stopped() || document.hidden || !visible || e.button !== 0) return
      if (e.target instanceof Element && e.target.closest("a,button,summary,input,textarea,select")) return
      const rect = host.getBoundingClientRect()
      const x = e.clientX - rect.left, y = e.clientY - rect.top
      if (x < 0 || y < 0 || x > width || y > height) return
      addRing(x, y, clock)
      wake()
    }
    const onVisibility = () => {
      cancel()
      if (!document.hidden) wake()
    }
    const onMotion = () => refreshRef.current()
    const onDpr = () => { watchDpr(); resize() }
    const watchDpr = () => {
      dprQuery?.removeEventListener("change", onDpr)
      dprQuery = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
      dprQuery.addEventListener("change", onDpr)
    }

    const ro = new ResizeObserver(resize)
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true
        cancel()
        if (visible) wake()
      },
      { threshold: 0 }
    )
    const mo = new MutationObserver(() => refreshRef.current())

    readColor()
    resize()
    watchDpr()
    ro.observe(host)
    io.observe(host)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme"] })
    const target = interactionTarget?.current ?? host
    target.addEventListener("pointerdown", onDown, { passive: true })
    document.addEventListener("visibilitychange", onVisibility)
    reduceMotion.addEventListener("change", onMotion)
    wake()

    return () => {
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      target.removeEventListener("pointerdown", onDown)
      document.removeEventListener("visibilitychange", onVisibility)
      reduceMotion.removeEventListener("change", onMotion)
      dprQuery?.removeEventListener("change", onDpr)
      ringsRef.current = []
      delete host.dataset.canvasReady
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
      refreshRef.current = () => {}
    }
  }, [interactionTarget])

  // Prop changes while the loop is asleep still repaint immediately.
  React.useEffect(() => {
    opts.current = { paused, maxDpr, spacing, dotRadius, baseOpacity, pingEvery, speed, ringWidth, amplitude, interactive, maxRings, seedPing, pingArea }
    refreshRef.current()
  }, [paused, maxDpr, spacing, dotRadius, baseOpacity, color, pingEvery, speed, ringWidth, amplitude, interactive, maxRings, seedPing, pingArea])

  return (
    <div
      ref={setHost}
      data-slot="sonar-grid"
      className={cn("relative isolate", className)}
      {...rest}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="text-primary pointer-events-none absolute inset-0 size-full"
        style={color ? { color } : undefined}
      />
      {children}
    </div>
  )
}

export default SonarGrid
