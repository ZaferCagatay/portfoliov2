import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types/project';
import type { Locale } from '@/types/content';
import { ProjectMeta } from './project-meta';
import styles from './project-carousel.module.css';
export function ProjectSlide({
  project,
  locale,
  index,
}: {
  project: Project;
  locale: Locale;
  index: number;
}) {
  const diagram = project.image.kind === 'diagram';
  return (
    <article className={styles.card}>
      <div className={styles.visual} data-kind={project.image.kind}>
        <div className={styles.imageComposition}>
          <Image
            className={styles.mainImage}
            src={project.image.src}
            width={project.image.width}
            height={project.image.height}
            alt={project.image.alt[locale]}
            sizes={
              project.image.kind === 'mobile'
                ? '240px'
                : '(max-width: 767px) 85vw, (max-width: 1023px) 80vw, 540px'
            }
            loading="lazy"
            draggable={false}
          />
          {project.detailImage && (
            <Image
              className={styles.detailImage}
              src={project.detailImage.src}
              width={project.detailImage.width}
              height={project.detailImage.height}
              alt={project.detailImage.alt[locale]}
              sizes="(max-width: 1023px) 1px, 180px"
              loading="lazy"
              draggable={false}
            />
          )}
        </div>
        {diagram && (
          <p className={styles.diagramCaption}>
            {locale === 'en'
              ? 'System overview · Not a product screenshot'
              : 'Sistem özeti · Ürün ekran görüntüsü değildir'}
          </p>
        )}
      </div>
      <div className={styles.information}>
        <div className={styles.identity}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span>{project.category[locale]}</span>
        </div>
        <h3>{project.name[locale]}</h3>
        <p className={styles.description}>{project.description[locale]}</p>
        <ProjectMeta project={project} locale={locale} />
        <div className={styles.actions}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              {locale === 'en' ? 'Visit live site' : 'Canlı siteyi ziyaret et'}
              <ArrowUpRight size={17} aria-hidden="true" />
              <span className={styles.srOnly}>
                {locale === 'en'
                  ? ' (opens in a new tab)'
                  : ' (yeni sekmede açılır)'}
              </span>
            </a>
          )}
          {project.repositoryUrl && (
            <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
              {locale === 'en' ? 'Source code' : 'Kaynak kodu'}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          )}
          {!project.liveUrl && !project.repositoryUrl && (
            <p>
              {locale === 'en'
                ? 'Internal production platform'
                : 'Canlı şirket içi platform'}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
