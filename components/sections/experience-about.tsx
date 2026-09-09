import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionMotion } from "@/components/ui/section-motion";
import { TextLink } from "@/components/ui/text-link";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { profile } from "@/data/profile";
import { sections } from "@/data/copy/sections";
import type { Locale } from "@/types/content";
export function ExperienceAbout({locale}:{locale:Locale}) {const c=sections[locale];return <section id="about" className="page-section about-section" aria-labelledby="about-heading"><Container><SectionHeading id="about-heading">{c.about}</SectionHeading><div className="about-layout"><div className="timeline">{experience.map(entry=><SectionMotion key={entry.date.en} className="timeline-entry"><p className="timeline-date">{entry.date[locale]}</p><div data-reveal><h3>{entry.title[locale]}</h3>{entry.company && <p className="company">{entry.company}</p>}<p>{entry.body[locale]}</p></div><div className="section-rule" data-rule/></SectionMotion>)}<p className="education">{education[locale]}</p><p className="languages">{c.languages}</p><TextLink href={profile.resume}>{c.resume}<ArrowUpRight size={16} aria-hidden="true"/></TextLink></div><aside className="about-context"><Image src="/images/zafer.webp" alt={profile.name} width={720} height={720} sizes="(max-width: 767px) 100vw, 360px"/><p>{c.biography}</p></aside></div></Container></section>;}
