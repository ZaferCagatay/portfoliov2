import { ArrowDown, ArrowRight, ArrowUpRight, Check, Database, LockKeyhole, RefreshCw } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { EngineeringDiagram } from '@/components/production/engineering-diagram';
import { EngineeringMotion } from '@/components/production/engineering-motion';
import { engineeringCopy } from '@/data/engineering';
import styles from '@/components/production/engineering.module.css';
import type { Locale } from '@/types/content';

export function ProductionEngineering({ locale }: { locale: Locale }) {
  const c = engineeringCopy[locale];
  return (
    <section id="approach" className={`page-section production-section ${styles.section}`} aria-labelledby="approach-heading">
      <Container>
        <EngineeringMotion>
          <header className={styles.intro}>
            <h2 id="approach-heading">{c.heading}<span>{c.headingEnd}</span></h2>
            <div><p>{c.intro}</p><span className={styles.scope}>{c.scope}</span></div>
          </header>
          <EngineeringDiagram locale={locale} />
          <div className={styles.stories}>
            <article className={styles.story} data-engineering-reveal>
              <header className={styles.storyHeading}><h3>{c.tenancy.title}</h3><a href="https://getkarta.app">Karta <ArrowUpRight size={14} aria-hidden="true" /></a></header>
              <p>{c.tenancy.description}</p>
              <figure className={styles.tenants} aria-label={c.tenancy.label}>
                <div className={styles.tenantColumns}><span>{c.tenancy.company}</span><span>{c.tenancy.boundary}</span><span>PostgreSQL</span></div>
                {['A', 'B'].map((tenant) => (
                  <div className={styles.tenantLane} key={tenant}>
                    <span className={styles.company}>{c.tenancy.company} {tenant}</span>
                    <span className={styles.tenantGate}><ArrowRight size={14} aria-hidden="true" /><LockKeyhole size={15} aria-hidden="true" /><span>RBAC</span><ArrowRight size={14} aria-hidden="true" /></span>
                    <span className={styles.tenantData}><Database size={16} aria-hidden="true" /><span>{c.tenancy.records} {tenant}</span></span>
                  </div>
                ))}
                <figcaption><LockKeyhole size={13} aria-hidden="true" />{c.tenancy.caption}</figcaption>
              </figure>
            </article>
            <article className={styles.story} data-engineering-reveal>
              <header className={styles.storyHeading}><h3>{c.offline.title}</h3><a href="https://pavlovpet.app">Pavlov <ArrowUpRight size={14} aria-hidden="true" /></a></header>
              <p>{c.offline.description}</p>
              <figure className={styles.sync} aria-label={c.offline.label}>
                <div className={styles.syncZones}><span>{c.offline.device}</span><span>{c.offline.cloud}</span></div>
                <div className={styles.syncFlow}>
                  <div className={styles.localData}><span>{c.offline.mobile}</span><ArrowDown size={16} aria-hidden="true" /><strong>SQLite</strong><span className={styles.localNote}><Check size={13} aria-hidden="true" />{c.offline.local}</span></div>
                  <div className={styles.syncBridge}><span>{c.offline.connection}</span><svg viewBox="0 0 140 48" aria-hidden="true"><path d="M4 12H132l-7-6m7 6-7 6M136 36H8l7-6m-7 6 7 6" data-engineering-path pathLength="1" /></svg><span>{c.offline.synchronize}</span></div>
                  <div className={styles.cloudData}><span>REST API</span><ArrowDown size={16} aria-hidden="true" /><strong>PostgreSQL</strong><span className={styles.localNote}>{c.offline.backend}</span></div>
                </div>
                <figcaption><RefreshCw size={13} aria-hidden="true" />{c.offline.caption}</figcaption>
              </figure>
            </article>
          </div>
          <div className={styles.lifecycle} data-engineering-reveal>
            <div className={styles.lifecycleIntro}><h3>{c.lifecycle.title}</h3><p>{c.lifecycle.description}</p></div>
            <div className={styles.lifecycleDiagram}>
              <ol>{c.lifecycle.steps.map((step, i) => <li key={step[0]}><span className={styles.stepDot} aria-hidden="true">{i === 5 ? <RefreshCw size={13} /> : <Check size={12} />}</span><strong>{step[0]}</strong><span>{step[1]}</span></li>)}</ol>
              <div className={styles.feedback}><svg viewBox="0 0 1000 24" preserveAspectRatio="none" aria-hidden="true"><path d="M990 0v14H10V0m-5 5 5-5 5 5" pathLength="1" data-engineering-path /></svg><span>{c.lifecycle.loop}</span></div>
            </div>
          </div>
          <div className={styles.otherWork}><span>{c.also}</span><p>{c.operations} <span>React / .NET Web API / MySQL</span></p><p>{c.affiliate} <span>{c.realtime}</span></p></div>
        </EngineeringMotion>
      </Container>
    </section>
  );
}
