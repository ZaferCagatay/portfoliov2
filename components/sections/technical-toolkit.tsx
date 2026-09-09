import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionMotion } from '@/components/ui/section-motion';
import { technologies } from '@/data/technologies';
import { sections } from '@/data/copy/sections';
import type { Locale } from '@/types/content';
export function TechnicalToolkit({ locale }: { locale: Locale }) {
  return (
    <section
      id="toolkit"
      className="page-section"
      aria-labelledby="toolkit-heading"
    >
      <Container>
        <SectionHeading id="toolkit-heading" className="toolkit-heading">
          {sections[locale].toolkit}
        </SectionHeading>
        <dl className="toolkit-matrix">
          {technologies.map((row) => (
            <SectionMotion key={row.area.en} className="toolkit-row">
              <dt>
                <span className="section-rule" aria-hidden="true" data-rule />
                {row.area[locale]}
              </dt>
              <dd data-reveal>
                {typeof row.tools === 'string' ? row.tools : row.tools[locale]}
              </dd>
              <dd className="toolkit-context">{row.context[locale]}</dd>
            </SectionMotion>
          ))}
        </dl>
      </Container>
    </section>
  );
}
