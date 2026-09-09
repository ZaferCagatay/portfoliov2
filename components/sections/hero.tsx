import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { TextLink } from '@/components/ui/text-link';
import { HeroProof } from '@/components/hero/hero-proof';
import { HeroMotion } from '@/components/hero/hero-motion';
import { HeroField } from '@/components/hero/hero-field';
import { profile } from '@/data/profile';
import type { Copy } from '@/types/content';
export function Hero({ copy }: { copy: Copy }) {
  return (
    <HeroMotion
      labels={{
        pause: copy.pause,
        resume: copy.resumeMotion,
        reduced: copy.reducedMotion,
      }}
    >
      <HeroField />
      <Container className="hero-inner">
        <div className="hero-introduction" data-enter="identity">
          <p className="identity">{profile.name}</p>
          <p className="role">{copy.role}</p>
        </div>
        <div className="hero-composition">
          <div className="hero-copy">
            <div className="headline-exit">
              <h1 data-enter="headline">{copy.headline}</h1>
            </div>
            <p className="hero-description" data-enter="description">
              {copy.description}
            </p>
            <div className="hero-primary" data-enter="actions">
              <ButtonLink href="#projects">
                {copy.work}
                <ArrowDown size={18} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink variant="secondary" href={`mailto:${profile.email}`}>
                {copy.contact}
                <ArrowUpRight size={18} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
          <HeroProof copy={copy} />
        </div>
        <div className="hero-editorial" data-enter="editorial">
          <div>
            <p className="working-context">{copy.context}</p>
            <p className="working-arrangement">{copy.working}</p>
          </div>
          <div className="editorial-actions">
            <TextLink href={`mailto:${profile.email}`}>
              {copy.contact}
              <ArrowUpRight size={18} aria-hidden="true" />
            </TextLink>
            <TextLink href={profile.resume}>
              {copy.resume}
              <ArrowUpRight size={16} aria-hidden="true" />
            </TextLink>
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#projects" className="scroll-cue">
            <ArrowDown size={14} aria-hidden="true" />
            {copy.scroll}
          </a>
          <span className="location-note">
            Istanbul, TR <span aria-hidden="true">/</span> UTC+3
          </span>
        </div>
      </Container>
    </HeroMotion>
  );
}
