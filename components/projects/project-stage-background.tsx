"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import styles from "./project-carousel.module.css";
export function ProjectStageBackground({ src, stopped }: { src: string; stopped: boolean }) {
  return <div className={styles.background} aria-hidden="true"><AnimatePresence initial={false}><motion.div key={src} initial={{ opacity: stopped ? 1 : 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: stopped ? 0 : .3 }}><Image src={src} alt="" fill sizes="320px" loading="lazy"/></motion.div></AnimatePresence></div>;
}
