import { RefreshCw } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { EngineeringDiagram } from '@/components/production/engineering-diagram';
import { EngineeringMotion } from '@/components/production/engineering-motion';
import { EngineeringStepVisual } from '@/components/production/engineering-step-visual';
import { engineeringCopy } from '@/data/engineering';
import styles from '@/components/production/engineering.module.css';
import type { Locale } from '@/types/content';

export function ProductionEngineering({ locale }: { locale: Locale }) {
  const c = engineeringCopy[locale];
  return (
    <section id="approach" className={`page-section production-section ${styles.section}`} aria-labelledby="approach-heading">
      <Container>
        <EngineeringMotion stepCount={c.stages.length}>
        <header className={styles.intro}>
          <h2 id="approach-heading">{c.heading}<span>{c.headingEnd}</span></h2>
          <div><p>{c.intro}</p><span className={styles.scope}>{c.scope}</span></div>
        </header>
          <div className={styles.journey}>
            <div className={styles.stepsViewport}>
            <ol id="engineering-steps" className={styles.steps} aria-label={c.journey}>
              {c.stages.map((stage, index) => (
                <li key={stage.title} className={styles.step} data-engineering-step={index} id={`engineering-step-${index + 1}`}>
                  <span className={styles.stepIndex} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <div className={styles.stepContent}>
                    <h3>{stage.title}</h3>
                    <p>{stage.description}</p>
                    <span className={styles.outcome}>{stage.outcome}</span>
                    <EngineeringStepVisual index={index} labels={stage.labels} />
                  </div>
                </li>
              ))}
            </ol>
            </div>
            <EngineeringDiagram locale={locale} />
          </div>
        </EngineeringMotion>
        <footer className={styles.closing}>
          <RefreshCw size={24} strokeWidth={1.4} aria-hidden="true" />
          <p>{c.close}<strong>{c.closeEnd}</strong></p>
          <span>{c.closeDetail}</span>
        </footer>
      </Container>
    </section>
  );
}
