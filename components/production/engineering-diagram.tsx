'use client';
import { useId, useState } from 'react';
import { ArrowDown, ArrowRight, Box, Check, ChevronRight, Database, Fingerprint, Layers3, LockKeyhole, Monitor, Network, Smartphone, Workflow } from 'lucide-react';
import { engineeringCopy } from '@/data/engineering';
import type { Locale } from '@/types/content';
import styles from './engineering.module.css';

export function EngineeringDiagram({ locale }: { locale: Locale }) {
  const c = engineeringCopy[locale];
  const [product, setProduct] = useState<'karta' | 'pavlov'>('karta');
  const [layer, setLayer] = useState(1);
  const detailId = useId();
  const project = c.projects[product];
  const mobile = product === 'pavlov';
  const layers = [Monitor, LockKeyhole, Database];
  return (
    <div className={styles.system}>
      <div className={styles.systemToolbar}>
        <div className={styles.productControls} role="group" aria-label={c.explore}>
          {(['karta', 'pavlov'] as const).map((id) => <button key={id} type="button" aria-pressed={product === id} onClick={() => setProduct(id)}><span className={styles.productMark} aria-hidden="true">{id === 'karta' ? 'k' : 'p'}</span>{id === 'karta' ? 'Karta' : 'Pavlov'}<span className={styles.productType}>{id === 'karta' ? 'SaaS' : 'iOS / Android'}</span></button>)}
        </div>
        <span className={styles.mapLabel}><Network size={14} aria-hidden="true" />{c.summary}</span>
      </div>
      <figure aria-label={`${product === 'karta' ? 'Karta' : 'Pavlov'} — ${c.systemLabel}`}>
        <div className={styles.map} key={product}>
          <div className={styles.mapHeading}><span>{project.kind}</span><span>{c.inspect}</span></div>
          <div className={styles.architecture}>
            {c.layers.map((label, index) => {
              const Icon = mobile && index === 0 ? Smartphone : layers[index];
              return (
                <div className={styles.layer} key={label}>
                  <div className={styles.layerLabel}><span>{String(index + 1).padStart(2, '0')}</span>{label}</div>
                  <button type="button" className={`${styles.node} ${index === 0 ? styles.clientNode : index === 1 ? styles.apiNode : styles.dataNode}`} aria-pressed={layer === index} aria-controls={detailId} onClick={() => setLayer(index)}>
                    <span className={styles.nodeTitle}><Icon size={19} strokeWidth={1.5} aria-hidden="true" /><strong>{index === 0 ? project.client : index === 1 ? 'API / Services' : 'PostgreSQL'}</strong><ChevronRight size={14} aria-hidden="true" /></span>
                    {index === 0 ? <>
                      <span className={styles.tech}>{project.clientTech}</span>
                      <span className={`${styles.interfaceVisual} ${mobile ? styles.phoneVisual : ''}`}>
                        <span className={styles.interfaceBar}><i /><i /><i /><span>{mobile ? 'Pavlov' : 'Karta'}</span></span>
                        <span className={styles.screenRows}>{project.screens.map((screen, i) => <span key={screen}><span className={styles.screenGlyph} aria-hidden="true">{i === 2 ? <Workflow size={13} /> : <Layers3 size={13} />}</span>{screen}<ChevronRight size={12} aria-hidden="true" /></span>)}</span>
                      </span>
                    </> : index === 1 ? <>
                      <span className={styles.tech}>{project.api}</span>
                      <span className={styles.gates}>{project.gates.map((gate, i) => <span key={gate}>{i === 0 ? <Fingerprint size={15} aria-hidden="true" /> : i === 1 ? <LockKeyhole size={15} aria-hidden="true" /> : <Workflow size={15} aria-hidden="true" />}{gate}{i < 2 && <ArrowDown size={12} className={styles.gateArrow} aria-hidden="true" />}</span>)}</span>
                    </> : <>
                      <span className={styles.tech}>{mobile ? 'PostgreSQL / SQLite' : 'PostgreSQL / SQL'}</span>
                      <span className={styles.recordStack}>{project.data.map((record, i) => <span key={record}><span className={styles.recordKey} aria-hidden="true">{i === 0 ? <Database size={13} /> : <Layers3 size={13} />}</span>{record}<i aria-hidden="true" /></span>)}</span>
                    </>}
                  </button>
                  {index < 2 && <span className={styles.connector} aria-hidden="true"><svg viewBox="0 0 60 24"><path d="M0 12H58m-6-5 6 5-6 5" pathLength="1" data-engineering-path /></svg><span>{index === 0 ? 'REST' : 'SQL'}</span></span>}
                </div>
              );
            })}
          </div>
          <div className={styles.integrationRow}>
            <span className={styles.integrationNote}><span className={styles.branchLine} aria-hidden="true" />{c.ai}</span>
            <button type="button" className={styles.aiNode} aria-pressed={layer === 3} aria-controls={detailId} onClick={() => setLayer(3)}><Workflow size={18} aria-hidden="true" /><span><strong>{project.ai}</strong><span>{project.aiFlow}</span></span><ChevronRight size={15} aria-hidden="true" /></button>
            <span className={styles.integrationReturn}><ArrowRight size={16} aria-hidden="true" />{project.screens[2]}</span>
          </div>
          <div className={styles.delivery}><span><Box size={16} aria-hidden="true" />{c.deployment}</span><ul>{project.deployment.map(item => <li key={item}><Check size={13} aria-hidden="true" />{item}</li>)}</ul></div>
        </div>
        <figcaption className={styles.mapCaption}>{c.overview}</figcaption>
      </figure>
      <div className={styles.inspector} id={detailId} role="status" aria-live="polite" aria-atomic="true"><span>{c.ownership}<strong>{layer === 3 ? 'AI' : c.layers[layer]}</strong></span><p>{project.details[layer]}</p></div>
    </div>
  );
}
