'use client';
import { useContext } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Bell, Check, CheckCheck, CreditCard, Database, GitBranch, HardDrive, LockKeyhole, Monitor, RefreshCw, Smartphone, Workflow } from 'lucide-react';
import { engineeringCopy } from '@/data/engineering';
import { EngineeringContext } from './engineering-motion';
import type { Locale } from '@/types/content';
import styles from './engineering.module.css';

function Wire({ built, branch = false }: { built: boolean; branch?: boolean }) {
  return <div className={`${styles.wire} ${branch ? styles.splitWire : ''}`} data-built={built} aria-hidden="true"><svg viewBox={branch ? '0 0 600 24' : '0 0 24 24'} preserveAspectRatio="none"><path d={branch ? 'M300 0V9H150V23m-4-4 4 4 4-4M300 9H450V23m-4-4 4 4 4-4' : 'M12 0V23m-4-4 4 4 4-4'} pathLength="1" /></svg></div>;
}

export function EngineeringDiagram({ locale }: { locale: Locale }) {
  const { active, select, engaged } = useContext(EngineeringContext);
  const c = engineeringCopy[locale];
  const m = c.map;
  const phase = active;
  const state = (step: number) => ({ 'data-built': phase >= step, 'data-current': phase === step });
  const icons = [Workflow, CreditCard, HardDrive, Bell];
  return (
    <div className={styles.visualColumn}>
      <div className={styles.stickyVisual}>
        <header className={styles.visualHeader}>
          <div><span className={styles.visualTitle}>{c.assembly}</span><span className={styles.staticStatus}>{c.complete}</span><span className={styles.activeStatus} role="status" aria-live="polite" aria-atomic="true"><span className={styles.phaseCount}>{String(phase + 1).padStart(2, '0')} / {String(c.stages.length).padStart(2, '0')}</span>{c.stages[phase].title}</span></div>
          <div className={styles.visualControls}>
            <button type="button" aria-controls="engineering-steps" onClick={() => select(Math.max(0, active - 1))} disabled={!engaged || active === 0} aria-label={c.previous}><ArrowLeft size={16} aria-hidden="true" /></button>
            <button type="button" aria-controls="engineering-steps" onClick={() => select(Math.min(c.stages.length - 1, active + 1))} disabled={!engaged || active === c.stages.length - 1} aria-label={c.next}><ArrowRight size={16} aria-hidden="true" /></button>
          </div>
        </header>
        <figure className={styles.canvas} aria-label={c.diagram}>
          <div className={styles.feedbackRoute} {...state(7)} aria-hidden="true"><span /><svg viewBox="0 0 20 20"><path d="M2 10h16m-5-5 5 5-5 5" /></svg></div>
          <div className={styles.systemBody}>
            <div className={`${styles.requirement} ${styles.block}`} {...state(0)}><GitBranch size={18} aria-hidden="true" /><strong>{m.requirement}</strong><span>{m.scope}</span></div>
            <Wire built={phase >= 1} />
            <div className={styles.productBoundary} {...state(1)}>
              <div className={styles.boundaryLabel}><span />{m.experience}<span /></div>
              <div className={`${styles.interface} ${styles.block}`} {...state(2)}>
                <div className={styles.interfaceTop}><Monitor size={17} aria-hidden="true" /><Smartphone size={13} aria-hidden="true" /><strong>{m.interface}</strong><span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span></div>
                <div className={styles.interfaceBody}><span className={styles.uiNavigation} aria-hidden="true"><i /><i /><i /></span><span className={styles.uiContent} aria-hidden="true"><i /><span><i /><i /><i /></span></span><span className={styles.interfaceStates}>{m.states}</span></div>
              </div>
              <Wire built={phase >= 3} />
              <div className={`${styles.application} ${styles.block}`} {...state(3)}><span className={styles.blockLabel}>{m.application}</span><div><span>{m.api}</span><ArrowRight size={13} aria-hidden="true" /><span><LockKeyhole size={13} aria-hidden="true" />{m.auth}</span><ArrowRight size={13} aria-hidden="true" /><span>{m.logic}</span></div></div>
              <Wire branch built={phase >= 3} />
              <div className={styles.systemBranches}>
                <div className={`${styles.data} ${styles.block}`} {...state(3)}><strong><Database size={17} aria-hidden="true" />{m.data}</strong><div className={styles.dataRelationships}><span>{m.records}</span><span>{m.boundaries}</span></div><span className={styles.localLabel}>{m.local}</span></div>
                <div className={`${styles.integrations} ${styles.block}`} {...state(4)}><strong><Workflow size={17} aria-hidden="true" />{m.services}</strong><div>{m.integrations.map((integration, i) => { const Icon = icons[i]; return <span key={integration}><Icon size={12} aria-hidden="true" />{integration}</span>; })}</div><span className={styles.localLabel}>{m.optional}</span></div>
              </div>
            </div>
            <div className={`${styles.quality} ${styles.block}`} {...state(5)}><CheckCheck size={17} aria-hidden="true" /><strong>{m.quality}</strong><span>{m.checks}</span></div>
            <Wire built={phase >= 6} />
            <div className={`${styles.production} ${styles.block}`} {...state(6)}><span className={styles.productionMark} aria-hidden="true"><Check size={14} /></span><strong>{m.production}</strong><span>{m.release}</span></div>
            <div className={styles.returnFlow} {...state(7)}><ArrowDown size={14} aria-hidden="true" /><span><RefreshCw size={14} aria-hidden="true" />{m.feedback}</span><span>{m.return}</span></div>
          </div>
          <figcaption>{c.diagramNote}</figcaption>
        </figure>
      </div>
    </div>
  );
}
