// Process direction: the user's product-engineering brief.
// Capability evidence: the resume and existing project data. No project-specific
// topology, numerical performance claim, or implied team-wide responsibility.
export const engineeringCopy = {
  en: {
    heading: 'A product problem.',
    headingEnd: 'A path to production.',
    intro:
      'I turn requirements into interfaces, systems, running software and keep improving what ships.',
    scope: 'Product thinking. Full-stack implementation. Ongoing ownership.',
    journey: 'The engineering lifecycle',
    diagram: 'How a product becomes a production system',
    assembly: 'One product, built layer by layer.',
    complete: 'The complete system',
    previous: 'Previous engineering stage',
    next: 'Next engineering stage',
    diagramNote: 'A general workflow; the architecture follows the product.',
    stages: [
      {
        title: 'Understand the problem',
        description:
          'Start with the user flow, the constraints, and the first useful version.',
        outcome: 'A clear scope',
        labels: ['User need', 'Constraints', 'First version'],
      },
      {
        title: 'Plan the system',
        description:
          'Shape the experience, API boundaries, and data ownership before implementation.',
        outcome: 'An intentional structure',
        labels: ['User flow', 'Interface', 'API contract', 'Data model'],
      },
      {
        title: 'Build the interface',
        description:
          'Make the product work across screens, devices, and every interaction state.',
        outcome: 'A usable web or mobile product',
        labels: ['User action', 'Ready', 'Loading', 'Empty', 'Error'],
      },
      {
        title: 'Build the core',
        description:
          'Connect the interface to validated APIs, business rules, and reliable data.',
        outcome: 'A working vertical slice',
        labels: [
          'Validate',
          'Authorize',
          'Business logic',
          'Schema',
          'Integrity',
          'Data boundaries',
        ],
      },
      {
        title: 'Connect the services',
        description:
          'Integrate the capabilities the product needs, with clear boundaries.',
        outcome: 'One connected system',
        labels: ['Product', 'AI', 'Payments', 'Storage', 'Notifications'],
      },
      {
        title: 'Test and refine',
        description:
          'Follow real user journeys. Find the broken edges. Make the experience hold up.',
        outcome: 'Ready beyond the happy path',
        labels: [
          'User flows',
          'Edge cases',
          'Devices',
          'Accessibility',
          'Performance',
          'Regressions',
        ],
      },
      {
        title: 'Ship to production',
        description:
          'Move from local development to configured environments and repeatable releases.',
        outcome: 'Running software',
        labels: ['Configure', 'Migrate', 'Release', 'Web / mobile / cloud'],
      },
      {
        title: 'Observe and improve',
        description:
          'Turn production issues and user feedback into the next useful change.',
        outcome: 'The next iteration',
        labels: ['Logs + feedback', 'Debug + improve', 'Next requirement'],
      },
    ],
    map: {
      requirement: 'Product requirement',
      scope: 'User flow + first useful version',
      experience: 'Product experience',
      interface: 'Web / mobile interface',
      states: 'Responsive · loading · empty · error',
      application: 'Application layer',
      api: 'API',
      auth: 'Auth + permissions',
      logic: 'Business logic',
      data: 'Data model',
      records: 'Relationships + integrity',
      boundaries: 'Access + data boundaries',
      local: 'Local / offline where needed',
      services: 'Integrations',
      optional: 'As the product needs',
      integrations: ['AI', 'Payments', 'Storage', 'Notifications'],
      quality: 'Test + refine',
      checks: 'User flows · edge cases · devices · performance',
      production: 'Production',
      release: 'Environment → migrations → release',
      feedback: 'Logs → debug → improve',
      return: 'Back to the next requirement',
    },
    close: 'The release is a milestone.',
    closeEnd: 'Ownership continues.',
    closeDetail: 'Real usage → feedback → the next iteration',
  },
  tr: {
    heading: 'Bir ürün problemi.',
    headingEnd: 'Canlıya giden bir yol.',
    intro:
      'Gereksinimleri arayüzlere, sistemlere ve çalışan yazılıma dönüştürüyor; yayına çıkan ürünü geliştirmeye devam ediyorum.',
    scope: 'Ürün odaklı düşünce. Full-stack geliştirme. Sürekli sorumluluk.',
    journey: 'Ürün geliştirme yaşam döngüsü',
    diagram: 'Bir ürünün canlı sisteme dönüşümü',
    assembly: 'Katman katman kurulan bir ürün.',
    complete: 'Sistemin bütünü',
    previous: 'Önceki geliştirme aşaması',
    next: 'Sonraki geliştirme aşaması',
    diagramNote:
      'Genel bir iş akışı; mimari, ürünün ihtiyacına göre şekillenir.',
    stages: [
      {
        title: 'Problemi anla',
        description: 'Kullanıcı akışı, kısıtlar ve ilk faydalı sürümle başla.',
        outcome: 'Net bir kapsam',
        labels: ['Kullanıcı ihtiyacı', 'Kısıtlar', 'İlk sürüm'],
      },
      {
        title: 'Sistemi planla',
        description:
          'Geliştirmeden önce deneyimi, API sınırlarını ve veri sorumluluğunu şekillendir.',
        outcome: 'Bilinçli bir yapı',
        labels: ['Kullanıcı akışı', 'Arayüz', 'API sözleşmesi', 'Veri modeli'],
      },
      {
        title: 'Arayüzü geliştir',
        description:
          'Ürünü farklı ekranlarda, cihazlarda ve her etkileşim durumunda kullanılabilir kıl.',
        outcome: 'Kullanılabilir bir web veya mobil ürün',
        labels: ['Kullanıcı eylemi', 'Hazır', 'Yükleniyor', 'Boş', 'Hata'],
      },
      {
        title: 'Çekirdeği kur',
        description:
          'Arayüzü doğrulanmış API’lere, iş kurallarına ve güvenilir veriye bağla.',
        outcome: 'Uçtan uca çalışan bir akış',
        labels: [
          'Doğrula',
          'Yetkilendir',
          'İş mantığı',
          'Şema',
          'Bütünlük',
          'Veri sınırları',
        ],
      },
      {
        title: 'Servisleri bağla',
        description:
          'Ürünün ihtiyaç duyduğu yetenekleri sınırları belirli entegrasyonlarla birleştir.',
        outcome: 'Birbirine bağlı tek sistem',
        labels: ['Ürün', 'Yapay zekâ', 'Ödemeler', 'Depolama', 'Bildirimler'],
      },
      {
        title: 'Test et ve iyileştir',
        description:
          'Gerçek kullanıcı yolculuklarını izle. Uç durumları bul. Deneyimi sağlamlaştır.',
        outcome: 'İdeal akışın ötesine hazır',
        labels: [
          'Kullanıcı akışları',
          'Uç durumlar',
          'Cihazlar',
          'Erişilebilirlik',
          'Performans',
          'Regresyonlar',
        ],
      },
      {
        title: 'Canlıya al',
        description:
          'Yerel geliştirmeden yapılandırılmış ortamlara ve tekrarlanabilir sürümlere geç.',
        outcome: 'Çalışan yazılım',
        labels: ['Yapılandır', 'Veriyi taşı', 'Yayımla', 'Web / mobil / bulut'],
      },
      {
        title: 'Gözlemle ve geliştir',
        description:
          'Canlıdaki sorunları ve kullanıcı geri bildirimlerini bir sonraki faydalı değişime dönüştür.',
        outcome: 'Bir sonraki iterasyon',
        labels: [
          'Loglar + geri bildirim',
          'Hata çöz + geliştir',
          'Yeni gereksinim',
        ],
      },
    ],
    map: {
      requirement: 'Ürün gereksinimi',
      scope: 'Kullanıcı akışı + ilk faydalı sürüm',
      experience: 'Ürün deneyimi',
      interface: 'Web / mobil arayüz',
      states: 'Duyarlı · yükleme · boş · hata',
      application: 'Uygulama katmanı',
      api: 'API',
      auth: 'Kimlik + yetkiler',
      logic: 'İş mantığı',
      data: 'Veri modeli',
      records: 'İlişkiler + bütünlük',
      boundaries: 'Erişim + veri sınırları',
      local: 'Gerektiğinde yerel / çevrimdışı',
      services: 'Entegrasyonlar',
      optional: 'Ürünün ihtiyacına göre',
      integrations: ['Yapay zekâ', 'Ödemeler', 'Depolama', 'Bildirimler'],
      quality: 'Test + iyileştirme',
      checks: 'Kullanıcı akışları · uç durumlar · cihazlar · performans',
      production: 'Canlı ortam',
      release: 'Ortam → veri geçişi → sürüm',
      feedback: 'Loglar → hata çözümü → iyileştirme',
      return: 'Yeni gereksinime dönüş',
    },
    close: 'Yayınlamak bir kilometre taşı.',
    closeEnd: 'Sorumluluk devam eder.',
    closeDetail: 'Gerçek kullanım → geri bildirim → sonraki iterasyon',
  },
} as const;
