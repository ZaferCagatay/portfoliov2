import { ArrowDown, ArrowRight, Check, Circle, CircleDashed, Database, GitBranch, HardDrive, LockKeyhole, Minus, RefreshCw, TriangleAlert } from 'lucide-react';
import styles from './engineering.module.css';

/** Compact process artifacts take over from the sticky system on small screens. */
export function EngineeringStepVisual({ index, labels }: { index: number; labels: readonly string[] }) {
  return (
    <div className={styles.stepVisual}>
      {index === 0 && (
        <div className={styles.scopeFlow}>
          <div className={styles.scopeInputs}>
            {labels.slice(0, 3).map(label => <span key={label}>{label}</span>)}
          </div>
          <div className={styles.scopeConnector} aria-hidden="true"><ArrowRight size={14} /></div>
          <div className={styles.scopeVersion}>
            <strong><Check size={13} aria-hidden="true" />{labels[3]}</strong>
            <div className={styles.scopeJourney}>
              {labels.slice(4, 7).map((label, i) => (
                <span key={label}><i aria-hidden="true" />{label}{i < 2 && <ArrowRight size={11} aria-hidden="true" />}</span>
              ))}
            </div>
            <span className={styles.scopeCaption}>{labels[7]}</span>
          </div>
        </div>
      )}
      {index === 1 && <div className={styles.planFlow}><span><GitBranch size={16} aria-hidden="true" />{labels[0]}</span><div>{labels.slice(1).map(label => <span key={label}>{label}</span>)}</div></div>}
      {index === 2 && <div className={styles.interfacePreview}><span>{labels[0]}<ArrowRight size={14} aria-hidden="true" /></span><div>{labels.slice(1).map((label, i) => { const Icon = [Check, CircleDashed, Minus, TriangleAlert][i]; return <span key={label}><Icon size={13} aria-hidden="true" />{label}</span>; })}</div></div>}
      {index === 3 && <div className={styles.coreFlow}><div>{labels.slice(0, 3).map((label, i) => <span key={label}>{i === 1 && <LockKeyhole size={13} aria-hidden="true" />}{label}{i < 2 && <ArrowRight size={12} aria-hidden="true" />}</span>)}</div><ArrowDown size={16} aria-hidden="true" /><span><Database size={16} aria-hidden="true" />{labels.slice(3).join(' · ')}</span></div>}
      {index === 4 && <div className={styles.servicesFlow}><span>{labels[0]}</span><div>{labels.slice(1).map(label => <span key={label}><Circle size={5} aria-hidden="true" />{label}</span>)}</div></div>}
      {index === 5 && <div className={styles.qaGrid}>{labels.map(label => <span key={label}><Check size={13} aria-hidden="true" />{label}</span>)}</div>}
      {index === 6 && <div className={styles.shipFlow}><div>{labels.slice(0, 3).map((label, i) => <span key={label}>{label}{i < 2 && <ArrowRight size={13} aria-hidden="true" />}</span>)}</div><span><HardDrive size={14} aria-hidden="true" />{labels[3]}</span></div>}
      {index === 7 && <div className={styles.improveFlow}><div><span>{labels[0]}</span><ArrowRight size={14} aria-hidden="true" /><span>{labels[1]}</span></div><span><RefreshCw size={14} aria-hidden="true" />{labels[2]}</span></div>}
    </div>
  );
}
