import { projects } from "@/data/projects";
import type { Locale } from "@/types/content";
export function ProjectReservation({locale}: {locale:Locale}) {
 return <div className="project-reservation"><ol className="project-index">{projects.map(project => <li key={project.id}><h3>{project.name[locale]}</h3><p>{project.category[locale]}</p></li>)}</ol></div>;
}
