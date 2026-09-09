import type { Locale } from './content';
export type Localized = Record<Locale, string>;
export type ProjectAsset = {
  src: string;
  width: number;
  height: number;
  alt: Localized;
  kind: 'desktop' | 'mobile' | 'diagram';
};
export type Project = {
  id: string;
  slug: string;
  name: Localized;
  description: Localized;
  role: Localized;
  contribution: Localized;
  category: Localized;
  technologies: string[];
  engineeringFact: Localized;
  image: ProjectAsset;
  detailImage?: ProjectAsset;
  liveUrl?: string;
  repositoryUrl?: string;
  order: number;
};
