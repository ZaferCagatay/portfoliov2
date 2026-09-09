// Authority: public/resume/Zafer_Cagatay_Umut_Resume.pdf.
// These are conceptual relationships, not literal deployment topologies.
// SQLite synchronization is verified; a particular outbox implementation is not.
export const engineeringCopy = {
  en: {
    heading: 'From interface', headingEnd: 'to production.',
    intro: 'I build the product, the systems behind it, and the path to production. Then I stay responsible for what happens next.',
    scope: 'Web · Mobile · APIs · Data · AI · Infrastructure',
    explore: 'Explore a production system', summary: 'Architecture highlights', systemLabel: 'Product architecture and ownership',
    layers: ['Product interface', 'Application boundary', 'Persistent data'],
    inspect: 'Select a layer to explore my work.', ownership: 'What I own',
    ai: 'AI through the application', deployment: 'Delivery & operation', overview: 'Simplified system map · real project responsibilities',
    projects: {
      karta: {
        kind: 'Multi-tenant finance & CRM', client: 'Web workspace', clientTech: 'Next.js / React',
        screens: ['Finance', 'CRM', 'Analysis'], api: 'Express / TypeScript',
        gates: ['Authentication', 'Tenant context + RBAC', 'Financial workflows'], data: ['Company data', 'Financial records', 'CRM relationships'],
        ai: 'OpenAI', aiFlow: 'Financial context → analysis & scenarios',
        deployment: ['Docker deployment', 'Production debugging', 'Ongoing improvements'],
        details: [
          'Turned an inherited codebase into a production finance and CRM workspace used by multiple businesses.',
          'Own REST APIs, authentication, tenant isolation, role-based permissions, and financial product workflows.',
          'Own the PostgreSQL data model and the boundaries between each company’s business data.',
          'Built OpenAI-powered financial analysis, scoring, scenarios, and natural-language product features.',
        ],
      },
      pavlov: {
        kind: 'Production iOS & Android product', client: 'Mobile companion', clientTech: 'React Native / Expo',
        screens: ['Pet care', 'Health records', 'AI chat'], api: 'Node.js / Express',
        gates: ['Authentication', 'Subscriptions + entitlements', 'Pet-care workflows'], data: ['PostgreSQL backend', 'SQLite on device', 'Offline synchronization'],
        ai: 'AI / LLM services', aiFlow: 'Product context → chat & image features',
        deployment: ['iOS / Android releases', 'Real-user production fixes', 'Performance & reliability'],
        details: [
          'Built and shipped the React Native / Expo app on iOS and Android, with local SQLite data and offline synchronization.',
          'Built REST APIs, authentication, subscriptions and entitlements, notifications, admin tooling, and cloud storage integrations.',
          'Connect the PostgreSQL backend with offline-first SQLite on the device, keeping mobile and backend work in one product.',
          'Integrated AI chat and image features into the mobile product and its backend services.',
        ],
      },
    },
    tenancy: {
      title: 'One product. Separate businesses.', description: 'A shared application with explicit access and data boundaries.',
      label: 'Conceptual tenant isolation: each company passes role-based access control to access its own records.',
      company: 'Company', boundary: 'Access boundary', records: 'Records', caption: 'Logical tenant isolation · role-based access',
    },
    offline: {
      title: 'Useful beyond the connection.', description: 'Local data on the device. Synchronization with the backend.',
      label: 'Conceptual offline flow: mobile uses local SQLite; synchronization connects the device to REST APIs and PostgreSQL.',
      device: 'On the device', cloud: 'On the backend', mobile: 'Mobile UI', local: 'Available offline',
      connection: 'When connected', synchronize: 'Synchronize', backend: 'Shared product data', caption: 'Offline-first architecture · SQLite synchronization',
    },
    lifecycle: {
      title: 'Shipping is a loop.', description: 'I own the work on both sides of a release.',
      steps: [['Define', 'Product need'], ['Build', 'UI + business logic'], ['Integrate', 'APIs + data'], ['Ship', 'Deploy + release'], ['Observe', 'Real-world issues'], ['Improve', 'Fix + optimize']],
      loop: 'Production feedback informs the next change',
    },
    also: 'Across other production work', operations: 'Internal operations', affiliate: 'Affiliate platform', realtime: 'Realtime tracking + payout workflows',
  },
  tr: {
    heading: 'Arayüzden', headingEnd: 'canlı ürüne.',
    intro: 'Ürünü, arkasındaki sistemleri ve canlıya giden yolu kuruyorum. Sonrasında da sorumluluğunu üstleniyorum.',
    scope: 'Web · Mobil · API · Veri · Yapay zekâ · Altyapı',
    explore: 'Canlı bir sistemi keşfedin', summary: 'Mimarinin ana hatları', systemLabel: 'Ürün mimarisi ve teknik sorumluluk',
    layers: ['Ürün arayüzü', 'Uygulama sınırı', 'Kalıcı veri'],
    inspect: 'Çalışmalarımı görmek için bir katman seçin.', ownership: 'Üstlendiğim sorumluluk',
    ai: 'Uygulama üzerinden yapay zekâ', deployment: 'Dağıtım ve işletim', overview: 'Özet sistem haritası · gerçek proje sorumlulukları',
    projects: {
      karta: {
        kind: 'Çok kiracılı finans ve CRM', client: 'Web çalışma alanı', clientTech: 'Next.js / React',
        screens: ['Finans', 'CRM', 'Analiz'], api: 'Express / TypeScript',
        gates: ['Kimlik doğrulama', 'Kiracı bağlamı + RBAC', 'Finansal iş akışları'], data: ['Şirket verileri', 'Finansal kayıtlar', 'CRM ilişkileri'],
        ai: 'OpenAI', aiFlow: 'Finansal bağlam → analiz ve senaryolar',
        deployment: ['Docker ile dağıtım', 'Canlıda hata ayıklama', 'Sürekli iyileştirme'],
        details: [
          'Devraldığım kod tabanını, birden fazla işletmenin kullandığı canlı bir finans ve CRM ürününe dönüştürdüm.',
          'REST API’ler, kimlik doğrulama, kiracı izolasyonu, rol tabanlı yetkiler ve finansal ürün akışlarını üstleniyorum.',
          'PostgreSQL veri modelini ve şirketlerin iş verileri arasındaki sınırları tasarlıyor ve sürdürüyorum.',
          'OpenAI destekli finansal analiz, puanlama, senaryo ve doğal dil özellikleri geliştirdim.',
        ],
      },
      pavlov: {
        kind: 'Canlı iOS ve Android ürünü', client: 'Mobil yardımcı', clientTech: 'React Native / Expo',
        screens: ['Evcil hayvan', 'Sağlık kayıtları', 'AI sohbet'], api: 'Node.js / Express',
        gates: ['Kimlik doğrulama', 'Abonelikler + erişim hakları', 'Evcil hayvan bakım akışları'], data: ['PostgreSQL backend', 'Cihazda SQLite', 'Çevrimdışı senkronizasyon'],
        ai: 'AI / LLM servisleri', aiFlow: 'Ürün bağlamı → sohbet ve görsel özellikleri',
        deployment: ['iOS / Android sürümleri', 'Kullanıcı kaynaklı hata çözümleri', 'Performans ve güvenilirlik'],
        details: [
          'Yerel SQLite ve çevrimdışı senkronizasyonla React Native / Expo uygulamasını iOS ve Android’de geliştirdim ve yayımladım.',
          'REST API’ler, kimlik doğrulama, abonelikler, erişim hakları, bildirimler, yönetim araçları ve bulut depolama entegrasyonları geliştirdim.',
          'PostgreSQL backend ile cihazdaki çevrimdışı öncelikli SQLite’ı bağlayarak mobil ve backend çalışmalarını tek üründe birleştiriyorum.',
          'Yapay zekâ sohbet ve görsel özelliklerini mobil ürüne ve backend servislerine entegre ettim.',
        ],
      },
    },
    tenancy: {
      title: 'Tek ürün. Ayrı işletmeler.', description: 'Erişim ve veri sınırları açıkça tanımlanmış ortak bir uygulama.',
      label: 'Kavramsal kiracı izolasyonu: her şirket rol tabanlı erişim kontrolünden geçerek kendi kayıtlarına erişir.',
      company: 'Şirket', boundary: 'Erişim sınırı', records: 'Kayıtlar', caption: 'Mantıksal kiracı izolasyonu · rol tabanlı erişim',
    },
    offline: {
      title: 'Bağlantı olmasa da çalışır.', description: 'Cihazda yerel veri. Backend ile senkronizasyon.',
      label: 'Kavramsal çevrimdışı akış: mobil arayüz yerel SQLite kullanır; senkronizasyon cihazı REST API ve PostgreSQL’e bağlar.',
      device: 'Cihazda', cloud: 'Backend’de', mobile: 'Mobil arayüz', local: 'Çevrimdışı erişim',
      connection: 'Bağlantı varken', synchronize: 'Senkronizasyon', backend: 'Ortak ürün verisi', caption: 'Çevrimdışı öncelikli mimari · SQLite senkronizasyonu',
    },
    lifecycle: {
      title: 'Yayınlamak bir döngü.', description: 'Sürüm öncesinde de sonrasında da sorumluluk bende.',
      steps: [['Tanımla', 'Ürün ihtiyacı'], ['Geliştir', 'UI + iş mantığı'], ['Entegre et', 'API + veri'], ['Yayımla', 'Dağıtım + sürüm'], ['Gözlemle', 'Gerçek sorunlar'], ['İyileştir', 'Düzelt + hızlandır']],
      loop: 'Canlıdan gelen geri bildirim bir sonraki değişime yön verir',
    },
    also: 'Diğer canlı projelerden', operations: 'İç operasyonlar', affiliate: 'Satış ortaklığı platformu', realtime: 'Gerçek zamanlı takip + ödeme akışları',
  },
} as const;
