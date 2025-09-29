# Mobiversite E-Commerce Projesi

Merhaba! Bu proje, Mobiversite Front-End Developer pozisyonu için geliştirdiğim modern bir e-ticaret uygulaması. Case gereksinimlerini karşılamanın yanında, gerçek dünyada kullanılabilecek seviyede bir platform yaratmaya odaklandım.

## Ne Yapmaya Çalıştım?

Test case'i oldukça net gereksinimler içeriyordu, ancak ben bunları bir başlangıç noktası olarak gördüm. Amacım sadece istenen özellikleri implement etmek değil, aynı zamanda scalable, maintainable ve gerçekten kullanılabilir bir e-ticaret deneyimi sunmaktı.

## Projede Neler Var?

### Core E-ticaret Özellikleri

- **Ürün gezinme ve detay sayfaları** - 20+ ürün ile dolu bir katalog
- **Akıllı sepet sistemi** - Giriş yapmadan da kullanılabiliyor, localStorage'da kalıcı
- **Favori ürünler** - Sadece üye kullanıcılar için
- **Kullanıcı girişi ve profil yönetimi** - Cookie-based authentication
- **Sipariş takibi** - Geçmiş siparişlerin detaylı görünümü
- **Checkout süreci** - Basit ama işlevsel

### Case'den Fazlası

Projeyi geliştirirken gerçek kullanım senaryolarını düşündüm ve birçok ek özellik ekledim:

#### Dual Backend Architecture

- **JSON Server**: Development için hızlı mock API
- **Production Backend**: Gerçek backend servisi için hazır altyapı
- Ortam değişkenlerine göre otomatik geçiş yapıyor

#### Comprehensive UI Library

Radix UI tabanlı 25+ component geliştirdim:

- Modern date picker'lar
- Data grid componentleri
- Advanced dialogs ve modals
- Progress bar'lar ve slider'lar
- Her şey accessibility standartlarına uygun

#### Mobile-First Approach

- Samsung Galaxy Fold (280px) desteği dahil tüm ekran boyutları
- Bottom navigation ile native app hissi
- BottomSheet component'i ile iOS/Android benzeri UX

#### Advanced State Management

Case sadece Context API istiyordu ama ben şunları da ekledim:

- **ListsContext**: Kullanıcıların özel ürün listeleri oluşturması için
- **CookieConsentContext**: GDPR uyumlu çerez yönetimi
- **ToastContext**: Pause/resume özellikli gelişmiş bildirim sistemi

#### Developer Experience

- **Smart development script**: Port çakışmalarını otomatik çözüyor
- Hot reload ve error handling
- Comprehensive linting ve formatting setup
- Production-ready build configuration

## Teknoloji Seçimleri

### Neden Next.js 15?

- Server ve client component'lerin doğru kullanımı için
- Built-in optimizasyonlar (image optimization, routing, SEO)
- Middleware ile güçlü route protection
- App Router ile modern file-based routing

### Neden Context API?

- Proje boyutu için Redux overkill olurdu
- Daha basit ve anlaşılır
- Next.js ile mükemmel uyum

### Neden Tailwind CSS?

- Hızlı prototype'lama
- Consistent design system
- Production'da küçük bundle size
- Galaxy Fold gibi extreme responsive design için ideal

## JSON Server Nasıl Çalışıyor?

Projenin en kritik parçalarından biri JSON Server integration'ı. İşte nasıl çalıştığı:

### Otomatik Setup

```bash
npm run dev
```

Bu komut çalıştığında:

1. Port 3000 ve 3001'deki tüm process'ler temizleniyor
2. JSON Server port 3001'de başlatılıyor
3. Next.js port 3000'de başlatılıyor
4. Service configuration'lar otomatik güncelleniyor

### API Endpoints

JSON Server şu endpoint'leri sağlıyor:

**Ürünler:**

- `GET /products` - Tüm ürünler
- `GET /products/:id` - Tek ürün
- `GET /products?category=electronics` - Kategori filtreleme

**Kullanıcılar:**

- `GET /users` - Kullanıcı listesi
- `POST /users` - Yeni kullanıcı
- `PATCH /users/:id` - Kullanıcı güncelleme

**Siparişler:**

- `GET /orders?userId=123` - Kullanıcı siparişleri
- `POST /orders` - Yeni sipariş

### Environment Switching

Projede akıllı bir backend switching sistemi var:

```javascript
// Development'da JSON Server
// Production'da gerçek API
export const apiService = process.env.NODE_ENV === 'production' ? vercelApiService : jsonServerService
```

## Kurulum ve Çalıştırma

### Hızlı Başlangıç

```bash
# Repository'yi clone'la
git clone [https://github.com/zzafergok/mobiversite-ecommerce.git]
cd mobiversite-ecommerce

# Dependencies'leri yükle
npm install

# Development server'ı başlat
npm run dev
```

Bu kadar! Sistem otomatik olarak:

- JSON Server'ı port 3001'de başlatacak
- Next.js'i port 3000'de başlatacak
- Port çakışmalarını çözecek
- Servis ayarlarını güncelleyecek

### Manuel Çalıştırma

Eğer ayrı ayrı çalıştırmak istersen:

```bash
# Sadece JSON Server
npm run json-server

# Sadece Next.js
npx next dev
```

### Test Kullanıcı

```
Kullanıcı Adı: demo
E-posta: demo@example.com
Şifre: password123
```

## Proje Yapısı

```
src/
├── app/                     # Next.js App Router
│   ├── api/auth/           # Authentication endpoints
│   ├── products/           # Ürün sayfaları
│   ├── cart/              # Sepet sayfası
│   ├── profile/           # Profil ve alt sayfalar
│   └── not-found.jsx      # 404 sayfası
├── components/
│   ├── core/              # Radix UI tabanlı temel componentler
│   ├── ecommerce/         # E-ticaret özel componentleri
│   ├── layout/            # Header, footer, navigation
│   └── ui/                # Özel UI componentleri
├── contexts/              # Global state management
├── hooks/                 # Custom React hooks
├── services/              # API service layer
└── middleware.js          # Route protection
```

## Özelliklerin Detayları

### Authentication System

- Cookie-based güvenli sistem
- Middleware ile otomatik route protection
- Token expiry handling
- Automatic redirect'ler

### Cart Management

- Guest kullanıcılar için localStorage persistence
- Member kullanıcılar için server-side sync
- Real-time quantity updates
- Checkout flow protection

### Responsive Design

Gerçekten her cihazda çalışır:

- **Desktop**: 1920px+
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px
- **Galaxy Fold**: 280px (özel optimizasyonlar)

### Performance Optimizations

- Next.js Image component ile lazy loading
- Server components ile SEO optimization
- Code splitting ve tree shaking
- Optimized bundle size
- Dynamic imports ve progressive loading

## Case Dışında Neler Ekledim?

### 1. Advanced Toast System

Normal bildirimler yerine:

- Farklı türlerde toast'lar (success, error, cart)
- Pause/resume functionality
- Auto-dismiss with timeout
- Ürün-specific cart notifications

### 2. GDPR Cookie Compliance

- Detaylı cookie consent management
- Category-based permissions
- 1 yıllık expiry system
- User preference storage

### 3. Custom Lists Feature

- Kullanıcıların özel ürün listeleri oluşturması
- Liste bazlı ürün organizasyonu
- Wishlist'ten bağımsız sistem

### 4. Mobile Bottom Navigation

- Native app benzeri deneyim
- Category modal ile akıllı navigasyon
- Badge system ile cart/wishlist counters

### 5. Advanced SEO Implementation

- **Dynamic Title & Meta Management**: Sayfa içeriğine göre otomatik SEO
- **Structured Data (JSON-LD)**: Google rich snippets için schema markup
- **Sitemap & Robots.txt**: Otomatik SEO dosya generasyonu
- **.store Domain Strategy**: E-ticaret odaklı domain optimizasyonu
- **Turkish SEO**: Yerel arama optimizasyonu
- **Breadcrumb Navigation**: SERP'lerde gelişmiş navigasyon

### 6. Production-Ready Architecture

- Environment-aware API switching
- Error boundaries ve fallback UI'lar
- Comprehensive error handling
- Deployment-ready configuration

## Development Experience

### Code Quality Tools

```bash
npm run lint          # ESLint check
npm run prettier      # Code formatting
npm run type-check    # TypeScript validation
npm run test          # Jest tests
```

### Smart Scripts

- `npm run dev`: Full development environment
- `npm run dev:legacy`: Alternative startup method
- `npm run build`: Production build
- `npm run start`: Production server

## SEO & Performance Features

### Search Engine Optimization

**Dinamik SEO Sistemi:**

- Ürün sayfalarında otomatik title generation
- Kategori bazlı meta description'lar
- Turkish category mapping (electronics → Elektronik)
- Open Graph ve Twitter Card optimizasyonu

**Structured Data Implementation:**

```javascript
// Otomatik schema markup
- WebsiteStructuredData: Site bilgileri
- ProductStructuredData: Ürün detayları
- BreadcrumbStructuredData: Navigasyon
```

**SEO Files:**

- `/sitemap.xml` - Dinamik sitemap generation
- `/robots.txt` - Search engine directives
- Dynamic canonical URLs

### Responsive Design Excellence

**Galaxy Fold Support (280px):**

```jsx
// Smart line breaking for mobile
<h1 className='text-2xl sm:text-3xl md:text-5xl'>
  Title<br className='sm:hidden' /> Continuation
</h1>

// Progressive spacing
<div className='space-y-4 sm:space-y-6'>
  // Content with responsive gaps
</div>
```

**Mobile-First Optimization:**

- Progressive text sizing: `text-2xl → text-3xl → text-5xl`
- Smart grid gaps: `gap-3 sm:gap-4 md:gap-6`
- Layout padding: `px-2 sm:px-4` prevents edge sticking
- Content breathing room for narrow screens

## Deployment

### Vercel (Recommended)

Proje Vercel için optimize edilmiş:

- Otomatik JSON Server proxy
- Environment variable handling
- Custom domain support (.store)
- Function timeout optimization
- SEO file generation

### Environment Variables

```bash
NEXT_PUBLIC_API_URL=your-backend-url
NODE_ENV=production
```

## Son Söz

Bu proje, case gereksinimlerini karşılamanın çok ötesinde bir deneyim sunuyor. Gerçek kullanıcıların gerçek ihtiyaçlarını düşünerek geliştirdim. Her feature'ı, her component'i gerçek dünyada kullanılabilir seviyede implement etmeye çalıştım.

Umarım değerlendirmeniz sırasında bu detaylara dikkat edebilirsiniz. Sorularınız olursa her zaman ulaşabilirsiniz!

---

_Bu proje Zafer Gök tarafından Mobiversite Front-End Developer pozisyonu için geliştirilmiştir._
