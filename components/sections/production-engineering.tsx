import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionMotion } from '@/components/ui/section-motion';
import { EngineeringDiagram } from '@/components/production/engineering-diagram';
import { EngineeringMotion } from '@/components/production/engineering-motion';
import { capabilities } from '@/data/capabilities';
import { sections } from '@/data/copy/sections';
import type { Locale } from '@/types/content';
export function ProductionEngineering({ locale }: { locale: Locale }) {
  const c = sections[locale];
  return (
    <section
      id="approach"
      className="page-section production-section"
      aria-labelledby="approach-heading"
    >
      <Container>
        <EngineeringMotion>
          <div className="engineering-layout">
            <div className="engineering-statement">
              <SectionHeading id="approach-heading">
                {c.approach}
              </SectionHeading>
              <p>{c.statement}</p>
            </div>
            <div>
              <SectionMotion>
                <EngineeringDiagram locale={locale} />
              </SectionMotion>
              <div className="capability-rows">
                {capabilities.map((row) => (
                  <article key={row.reference + row.title.en} data-capability>
                    <h3>{row.title[locale]}</h3>
                    <p>{row.body[locale]}</p>
                    <span className="project-reference">{row.reference}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </EngineeringMotion>
      </Container>
    </section>
  );
}
