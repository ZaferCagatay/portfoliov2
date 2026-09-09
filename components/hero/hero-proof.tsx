import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { heroProducts } from '@/data/hero';
import type { Copy } from '@/types/content';
export function HeroProof({ copy }: { copy: Copy }) {
  const { karta, pavlov } = heroProducts;
  return (
    <div
      id="hero-work"
      className="hero-proof"
      role="group"
      aria-label={copy.proof}
      tabIndex={-1}
    >
      <figure className="karta-proof" data-enter="karta">
        <figcaption>
          <a href={karta.url} className="product-label" target="_blank">
            <span className="product-marker" aria-hidden="true" />
            <strong>Karta</strong>
            <span className="product-kind">{copy.kartaLabel}</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </figcaption>
        <a
          href={karta.url}
          className="product-image-link karta-frame"
          aria-label={`Karta · ${copy.kartaLabel}`}
          target="_blank"
        >
          <div className="workspace-bar" aria-hidden="true">
            <span className="window-dots">
              <i />
              <i />
              <i />
            </span>
            <span>getkarta.app</span>
            <span className="window-end" />
          </div>
          <Image
            src={karta.image}
            width={karta.width}
            height={karta.height}
            alt={copy.kartaAlt}
            sizes="(max-width: 767px) 86vw, (max-width: 1023px) 75vw, 43vw"
            preload
          />
        </a>
      </figure>
      <figure className="pavlov-proof" data-enter="pavlov">
        <a
          className="product-image-link phone-frame"
          href={pavlov.url}
          aria-label={`Pavlov · ${copy.pavlovLabel}`}
          target="_blank"
        >
          <Image
            src={pavlov.image}
            width={pavlov.width}
            height={pavlov.height}
            alt={copy.pavlovAlt}
            sizes="(max-width: 767px) 112px, (max-width: 1023px) 160px, 180px"
          />
        </a>
        <figcaption>
          <a className="product-label" href={pavlov.url} target="_blank">
            <span className="product-marker" aria-hidden="true" />
            <span>
              <strong>Pavlov</strong>
              <span className="pavlov-platform">{copy.pavlovLabel}</span>
            </span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </figcaption>
      </figure>
    </div>
  );
}
