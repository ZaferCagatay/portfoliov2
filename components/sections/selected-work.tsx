import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionMotion } from '@/components/ui/section-motion';
import { ProjectCarousel } from '@/components/projects/project-carousel';
import { ProjectSlide } from '@/components/projects/project-slide';
import { projects } from '@/data/projects';
import { sections } from '@/data/copy/sections';
import type { Locale } from '@/types/content';
export function SelectedWork({ locale }: { locale: Locale }) {
  const c = sections[locale];
  return (
    <section
      id="projects"
      className="page-section selected-work"
      aria-labelledby="work-heading"
    >
      <Container>
        <SectionMotion>
          <div className="section-intro">
            <SectionHeading id="work-heading" data-reveal>
              {c.work}
            </SectionHeading>
            <p>{c.intro}</p>
          </div>
          <div className="section-rule" data-rule />
        </SectionMotion>
        <ProjectCarousel
          locale={locale}
          projects={projects.map((project) => ({
            id: project.id,
            name: project.name[locale],
            image: project.image.src,
          }))}
        >
          {projects.map((project, index) => (
            <ProjectSlide
              key={project.id}
              project={project}
              index={index}
              locale={locale}
            />
          ))}
        </ProjectCarousel>
      </Container>
    </section>
  );
}
