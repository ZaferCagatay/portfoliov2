import type { Project } from "@/types/project";
import { projectAssets } from "./project-assets";
export const projects: Project[] = [
  {
    "id": "karta",
    "slug": "karta",
    "name": {
      "en": "Karta",
      "tr": "Karta"
    },
    "description": {
      "en": "Multi-tenant finance and CRM SaaS with AI-powered analysis.",
      "tr": "Yapay zekâ destekli analiz sunan çok kiracılı finans ve CRM SaaS ürünü."
    },
    "role": {
      "en": "Full-Stack Developer / Product Engineer",
      "tr": "Full-Stack Geliştirici / Ürün Mühendisi"
    },
    "contribution": {
      "en": "Took over an existing codebase and developed it into a production product; owned frontend, backend, tenant isolation, RBAC, integrations, and deployment.",
      "tr": "Mevcut kod tabanını devralıp canlı ürüne dönüştürdüm; frontend, backend, kiracı izolasyonu, RBAC, entegrasyonlar ve dağıtımı üstlendim."
    },
    "category": {
      "en": "Production B2B SaaS",
      "tr": "Canlı B2B SaaS"
    },
    "technologies": [
      "Next.js",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Docker"
    ],
    "engineeringFact": {
      "en": "Tenant isolation and role-based access control.",
      "tr": "Kiracı izolasyonu ve rol tabanlı erişim kontrolü."
    },
    "image": projectAssets.karta,
    "order": 1,
    "liveUrl": "https://getkarta.app",
    "detailImage": projectAssets.kartaAnalysis
  },
  {
    "id": "pavlov",
    "slug": "pavlov",
    "name": {
      "en": "Pavlov Pet Care",
      "tr": "Pavlov Pet Care"
    },
    "description": {
      "en": "Production pet-care app for iOS and Android.",
      "tr": "iOS ve Android için canlı evcil hayvan bakım uygulaması."
    },
    "role": {
      "en": "Co-Founder & Full-Stack Developer",
      "tr": "Kurucu Ortak ve Full-Stack Geliştirici"
    },
    "contribution": {
      "en": "Built mobile and backend systems, AI features, subscriptions, notifications, offline synchronization, and releases.",
      "tr": "Mobil ve backend sistemlerini, yapay zekâ özelliklerini, abonelikleri, bildirimleri, çevrimdışı senkronizasyonu ve sürümleri geliştirdim."
    },
    "category": {
      "en": "iOS & Android",
      "tr": "iOS ve Android"
    },
    "technologies": [
      "React Native",
      "Expo",
      "Node.js",
      "PostgreSQL",
      "SQLite"
    ],
    "engineeringFact": {
      "en": "Offline-first SQLite synchronization.",
      "tr": "Çevrimdışı öncelikli SQLite senkronizasyonu."
    },
    "image": projectAssets.pavlov,
    "order": 2,
    "liveUrl": "https://pavlovpet.app",
    "detailImage": projectAssets.pavlovAssistant
  },
  {
    "id": "business-operations",
    "slug": "business-operations",
    "name": {
      "en": "Business Operations Admin Platform",
      "tr": "İş Operasyonları Yönetim Platformu"
    },
    "description": {
      "en": "Internal software centralizing operational data and automating recurring work.",
      "tr": "Operasyonel veriyi merkezileştiren ve tekrarlanan işleri otomatikleştiren şirket içi yazılım."
    },
    "role": {
      "en": "Full-Stack Developer",
      "tr": "Full-Stack Geliştirici"
    },
    "contribution": {
      "en": "Full-stack development of the production internal platform.",
      "tr": "Canlı şirket içi platformun full-stack geliştirmesi."
    },
    "category": {
      "en": "Internal business software",
      "tr": "Şirket içi iş yazılımı"
    },
    "technologies": [
      ".NET Web API",
      "C#",
      "React/Next.js",
      "TypeScript",
      "MySQL"
    ],
    "engineeringFact": {
      "en": "Centralized operational data and recurring workflow automation.",
      "tr": "Merkezi operasyonel veri ve tekrarlanan iş akışlarının otomasyonu."
    },
    "image": projectAssets.business,
    "order": 3
  },
  {
    "id": "affiliate-platform",
    "slug": "affiliate-platform",
    "name": {
      "en": "Affiliate Marketing Platform",
      "tr": "Satış Ortaklığı Platformu"
    },
    "description": {
      "en": "Admin and client dashboards for tracking activity and managing payouts.",
      "tr": "Etkinlik takibi ve ödeme yönetimi için yönetici ve müşteri panelleri."
    },
    "role": {
      "en": "Full-Stack Developer",
      "tr": "Full-Stack Geliştirici"
    },
    "contribution": {
      "en": "Built the platform from the ground up.",
      "tr": "Platformu sıfırdan geliştirdim."
    },
    "category": {
      "en": "Tracking & payout workflows",
      "tr": "Takip ve ödeme iş akışları"
    },
    "technologies": [
      "Node.js",
      "React",
      "MySQL"
    ],
    "engineeringFact": {
      "en": "Real-time registration, deposit, and conversion tracking.",
      "tr": "Gerçek zamanlı kayıt, para yatırma ve dönüşüm takibi."
    },
    "image": projectAssets.affiliate,
    "order": 4
  }
];
