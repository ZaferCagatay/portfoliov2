'use client';
import { useContext, useEffect, useState } from 'react';
import { SonarGrid } from '@/components/ui/sonar-grid';
import { HeroMotionContext } from '@/components/hero/hero-motion-context';
import { sonarTheme } from '@/lib/sonar-theme';
const pingArea: [number, number, number, number] = [0.12, 0.15, 0.88, 0.75];
export function HeroField() {
  const { paused, target } = useContext(HeroMotionContext);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const query = matchMedia('(max-width: 767px)');
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return (
    <div className="hero-field" aria-hidden="true">
      <SonarGrid
        className="sonar-canvas"
        paused={paused}
        interactionTarget={target}
        spacing={compact ? sonarTheme.mobileSpacing : sonarTheme.desktopSpacing}
        maxDpr={compact ? sonarTheme.constrainedDpr : sonarTheme.maxDpr}
        color={sonarTheme.peak}
        dotRadius={1.2}
        baseOpacity={0.2}
        pingEvery={5}
        ringWidth={100}
        speed={230}
        amplitude={1.8}
        maxRings={4}
        pingArea={pingArea}
      >
        <div className="field-dots" />
      </SonarGrid>
    </div>
  );
}
