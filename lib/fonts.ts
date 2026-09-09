import { Manrope, IBM_Plex_Mono } from "next/font/google";
export const manrope = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-manrope", display: "swap" });
export const mono = IBM_Plex_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], variable: "--font-ibm-plex-mono", display: "swap" });
