import type { Project } from "@/types/project";
import type { Locale } from "@/types/content";
import styles from "./project-carousel.module.css";
export function ProjectMeta({ project, locale }: { project: Project; locale: Locale }) {
  return <><dl className={styles.role}><dt>{locale === "en" ? "Role" : "Rol"}</dt><dd>{project.role[locale]}</dd></dl><p className={styles.contribution}>{project.contribution[locale]}</p><p className={styles.fact}>{project.engineeringFact[locale]}</p><ul className={styles.technologies} aria-label={locale === "en" ? "Technologies" : "Teknolojiler"}>{project.technologies.slice(0, 4).map(technology => <li key={technology}>{technology}</li>)}</ul></>;
}
