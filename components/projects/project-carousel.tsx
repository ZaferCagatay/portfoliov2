'use client';
import { Component, Children, type ReactNode, type KeyboardEvent } from 'react';
import type { Locale } from '@/types/content';
import { useProjectCarousel } from '@/hooks/use-project-carousel';
import { ProjectControls } from './project-controls';
import { ProjectStageBackground } from './project-stage-background';
import styles from './project-carousel.module.css';
export type ProjectSummary = { id: string; name: string; image: string };
type CarouselProps = {
  projects: ProjectSummary[];
  locale: Locale;
  children: ReactNode;
};

class EnhancementBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function ProjectCarousel(props: CarouselProps) {
  const slides = Children.toArray(props.children);
  const fallback = (
    <div className={styles.carousel} data-carousel data-enhanced="false">
      <div className={styles.viewport}>
        <div className={styles.track}>
          {props.projects.map((project, index) => (
            <div
              className={styles.slide}
              key={project.id}
              data-project-slide={project.id}
            >
              {slides[index]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  return (
    <EnhancementBoundary fallback={fallback}>
      <EnhancedProjectCarousel {...props} />
    </EnhancementBoundary>
  );
}

function EnhancedProjectCarousel({
  projects,
  locale,
  children,
}: CarouselProps) {
  const { viewportRef, ...carousel } = useProjectCarousel(projects.length);
  const slides = Children.toArray(children);
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      !carousel.enhanced ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      /INPUT|TEXTAREA|SELECT/.test((event.target as HTMLElement).tagName)
    )
      return;
    const target =
      event.key === 'ArrowLeft'
        ? 'previous'
        : event.key === 'ArrowRight'
          ? 'next'
          : (event.target as HTMLElement).closest('[data-carousel-controls]')
            ? event.key === 'Home'
              ? 0
              : event.key === 'End'
                ? projects.length - 1
                : null
            : null;
    if (target === null) return;
    event.preventDefault();
    // If navigation hides a focused project link, retain focus in the visible region.
    if ((event.target as HTMLElement).closest('[data-project-slide]'))
      event.currentTarget.focus({ preventScroll: true });
    carousel.navigate(target);
  };
  if (!projects.length) return null;
  const active = projects[carousel.settled] || projects[0];
  return (
    <div
      className={styles.carousel}
      role="region"
      aria-label={locale === 'en' ? 'Selected projects' : 'Seçili projeler'}
      aria-roledescription={
        carousel.enhanced
          ? locale === 'en'
            ? 'carousel'
            : 'karusel'
          : undefined
      }
      tabIndex={carousel.enhanced ? 0 : undefined}
      data-carousel
      data-enhanced={carousel.enhanced}
      data-stopped={carousel.stopped}
      onKeyDown={onKeyDown}
    >
      <div className={styles.stage}>
        {carousel.enhanced && (
          <ProjectStageBackground
            src={active.image}
            stopped={carousel.stopped}
          />
        )}
        <div className={styles.viewport} ref={viewportRef}>
          <div className={styles.track}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={styles.slide}
                data-project-slide={project.id}
                data-selected={index === carousel.selected}
                role="group"
                aria-roledescription={locale === 'en' ? 'slide' : 'slayt'}
                aria-label={
                  locale === 'en'
                    ? `${project.name}, project ${index + 1} of ${projects.length}`
                    : `${project.name}, ${projects.length} projeden ${index + 1}. proje`
                }
                inert={carousel.enhanced && index !== carousel.selected}
                onFocusCapture={() => {
                  if (carousel.enhanced && index !== carousel.selected)
                    carousel.navigate(index);
                }}
              >
                {slides[index]}
              </div>
            ))}
          </div>
        </div>
      </div>
      {carousel.enhanced && (
        <ProjectControls
          names={projects.map((project) => project.name)}
          locale={locale}
          {...carousel}
        />
      )}
      <p
        className={styles.srOnly}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {carousel.announced
          ? `${active.name}, ${carousel.settled + 1} / ${projects.length}`
          : ''}
      </p>
    </div>
  );
}
