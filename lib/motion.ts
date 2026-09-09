export const motionPolicy = {
  interaction: 0.18, small: 0.4, major: 0.68, stagger: 0.07,
  ease: [0.22, 1, 0.36, 1] as const,
  desktopQuery: "(min-width: 1024px) and (min-height: 850px)",
  pointerQuery: "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
};
