'use client';
import { createContext, type RefObject } from 'react';
export const HeroMotionContext = createContext<{
  paused: boolean;
  target?: RefObject<HTMLElement | null>;
}>({ paused: false });
