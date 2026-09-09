import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionMotion } from '@/components/ui/section-motion';
import { ButtonLink } from '@/components/ui/button';
import { TextLink } from '@/components/ui/text-link';
import { CopyEmailButton } from '@/components/contact/copy-email-button';
import { profile } from '@/data/profile';
import { sections } from '@/data/copy/sections';
import type { Locale } from '@/types/content';
export function Contact({ locale }: { locale: Locale }) {
  const c = sections[locale];
  return (
    <section
      id="contact"
      className="page-section contact-section"
      aria-labelledby="contact-heading"
    >
      <Container>
        <SectionMotion>
          <SectionHeading id="contact-heading" data-reveal>
            {c.contact}
          </SectionHeading>
          <div className="section-rule" data-rule />
        </SectionMotion>
        <div className="contact-layout">
          <div>
            <p className="contact-invitation">{c.invitation}</p>
            <a className="email-address" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <p className="contact-context">{c.working}</p>
          </div>
          <div>
            <div className="contact-buttons">
              <ButtonLink href={`mailto:${profile.email}`}>
                {c.email}
                <ArrowUpRight size={18} aria-hidden="true" />
              </ButtonLink>
              <CopyEmailButton labels={c} />
            </div>
            <div className="contact-links">
              <TextLink href={profile.github}>
                GitHub
                <ArrowUpRight size={16} aria-hidden="true" />
              </TextLink>
              <TextLink href={profile.resume}>
                {c.resume}
                <ArrowUpRight size={16} aria-hidden="true" />
              </TextLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
