import type { ProjectAsset } from '@/types/project';
export const projectAssets = {
  karta: {
    src: '/projects/karta/workspace.webp',
    width: 2400,
    height: 1432,
    kind: 'desktop',
    alt: {
      en: 'Karta finance and CRM workspace',
      tr: 'Karta finans ve CRM çalışma alanı',
    },
  },
  kartaAnalysis: {
    src: '/projects/karta/ai-analysis.webp',
    width: 1440,
    height: 1726,
    kind: 'desktop',
    alt: {
      en: 'Karta AI CFO financial analysis example',
      tr: 'Karta AI CFO finansal analiz örneği',
    },
  },
  pavlov: {
    src: '/projects/pavlov/home.webp',
    width: 1290,
    height: 2796,
    kind: 'mobile',
    alt: {
      en: 'Pavlov daily pet-care home screen',
      tr: 'Pavlov günlük evcil hayvan bakım ekranı',
    },
  },
  pavlovAssistant: {
    src: '/projects/pavlov/assistant.webp',
    width: 900,
    height: 1951,
    kind: 'mobile',
    alt: {
      en: 'Pavlov AI pet assistant conversation',
      tr: 'Pavlov yapay zekâ evcil hayvan asistanı sohbeti',
    },
  },
  pavlovHealth: {
    src: '/projects/pavlov/health-records.webp',
    width: 900,
    height: 1951,
    kind: 'mobile',
    alt: {
      en: 'Pavlov pet health records',
      tr: 'Pavlov evcil hayvan sağlık kayıtları',
    },
  },
  business: {
    src: '/projects/business-operations/overview.svg',
    width: 480,
    height: 640,
    kind: 'diagram',
    alt: {
      en: 'System overview: operational data, internal platform, recurring workflows',
      tr: 'Sistem özeti: operasyonel veri, şirket içi platform, tekrarlanan iş akışları',
    },
  },
  affiliate: {
    src: '/projects/affiliate-platform/overview.svg',
    width: 480,
    height: 640,
    kind: 'diagram',
    alt: {
      en: 'System overview: admin and client dashboards, activity tracking, payouts',
      tr: 'Sistem özeti: yönetici ve müşteri panelleri, etkinlik takibi, ödemeler',
    },
  },
} satisfies Record<string, ProjectAsset>;
