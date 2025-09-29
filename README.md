# Mobiversite E-Commerce Frontend Test Projesi

Bu proje, Mobiversite Front-End Developer pozisyonu için geliştirilmiş olan modern bir e-ticaret uygulamasıdır. Next.js 15, React, ve Tailwind CSS kullanılarak geliştirilmiştir.

## 🚀 Özellikler

### Temel E-ticaret Özellikleri

- ✅ Ürün listesi ve detay sayfaları
- ✅ Sepet yönetimi (misafir kullanıcılar da kullanabilir)
- ✅ Wishlist (favori ürünler) - sadece giriş yapmış kullanıcılar
- ✅ Kullanıcı girişi ve profil yönetimi
- ✅ Sipariş geçmişi
- ✅ Checkout akışı (sadece giriş yapmış kullanıcılar)

### Teknik Özellikler

- ✅ Next.js 15 app directory kullanımı
- ✅ Server ve Client componentlerinin uygun kullanımı
- ✅ Context API ile global state management
- ✅ Cookie-based authentication sistemi
- ✅ Middleware ile route koruması
- ✅ LocalStorage ile sepet kalıcılığı
- ✅ Loading states ve error handling
- ✅ Responsive tasarım (Galaxy Fold 4 - 280px dahil)

### İkili Backend Desteği

- ✅ **JSON Server**: Yerel development için mock API
- ✅ **Neon Database**: Arktos backend desteği (hazır)
- ✅ Kullanıcı profil sayfasından backend seçimi
- ✅ Environment context ile dinamik API routing

## 📱 Responsive Tasarım

Uygulama tüm cihaz türlerinde mükemmel çalışır:

- **Desktop**: 1920px+
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px
- **Ultra-narrow (Galaxy Fold 4)**: 280px

## 🛠️ Kurulum ve Çalıştırma

### Gereksinimler

- Node.js 18+
- npm veya yarn

### Kurulum

```bash
# Proje klasörüne git
cd mobiversite-ecommerce

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat (JSON Server + Next.js)
npm run dev

# Sadece Next.js frontend'i çalıştırmak için:
npm run dev:frontend

# Sadece JSON Server'ı çalıştırmak için:
npm run dev:json-server
```

Uygulama aşağıdaki URL'lerde çalışacak:

- **Frontend**: http://localhost:3000
- **JSON Server API**: http://localhost:3001

### Test Kullanıcı Bilgileri

```
Kullanıcı Adı: demo
Şifre: password123
```

## 📊 API Endpoints (JSON Server)

### Ürünler

- `GET /products` - Tüm ürünler
- `GET /products/:id` - Ürün detayı
- `GET /products?category=:category` - Kategoriye göre ürünler

### Kullanıcılar

- `GET /users` - Tüm kullanıcılar
- `GET /users/:id` - Kullanıcı detayı

### Siparişler

- `GET /orders` - Tüm siparişler
- `GET /orders?userId=:userId` - Kullanıcıya ait siparişler
- `POST /orders` - Yeni sipariş oluştur

## 🏗️ Proje Yapısı

```
src/
├── app/                          # Next.js app directory
│   ├── api/auth/                # Authentication API routes
│   ├── products/                # Ürün sayfaları
│   ├── cart/                    # Sepet sayfası
│   ├── profile/                 # Profil ve alt sayfalar
│   └── login/                   # Giriş sayfası
├── components/
│   ├── ecommerce/              # E-ticaret bileşenleri
│   └── layout/                 # Layout bileşenleri
├── contexts/                    # React Context providers
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   ├── WishlistContext.jsx
│   └── EnvironmentContext.jsx
├── hooks/
│   └── ecommerce/              # Custom hooks
├── services/
│   └── ecommerce/              # API servis katmanları
└── middleware.js               # Next.js middleware
```

## 🔧 Backend Seçimi

Uygulama iki farklı backend ile çalışabilir:

### 1. JSON Server (Default)

- Yerel development için ideal
- Mock veriler kullanır
- Offline çalışabilir
- Otomatik olarak çalışır

### 2. Neon Database + Arktos Backend

- Production-ready
- Gerçek veriler
- Arktos backend gerektirir
- Gizli admin sayfasından seçilebilir

## 🎨 Tasarım Kararları

### State Management

- **Context API** kullanıldı (Redux yerine basitlik için)
- Sepet, wishlist, auth ve environment için ayrı context'ler
- LocalStorage ile kalıcılık

### Authentication

- **Cookie-based** sistem
- Next.js middleware ile route koruması
- Basit token sistemi (production için JWT önerilir)

### Responsive Design

- **Mobile-first** yaklaşım
- Galaxy Fold 4 (280px) için özel optimizasyonlar
- Flexbox ve Grid kombinasyonu
- Progressive enhancement

### API Abstraction

- Servis katmanı ile backend abstraction
- Environment context ile dinamik routing
- Hook-based API kullanımı

## 🧪 Test

Uygulamayı test etmek için:

1. `npm run dev` ile başlatın
2. http://localhost:3000 adresine gidin
3. Demo kullanıcı ile giriş yapın
4. Ürünleri sepete ekleyin
5. Favorilere ekleyin
6. Checkout yapın
7. Profilde siparişlerinizi görün

## 📋 Önemli Notlar

### Performance

- Image optimization ile Next.js Image component kullanıldı
- Lazy loading uygulandı
- Server component'ler ile SEO optimizasyonu

### Accessibility

- Semantic HTML kullanıldı
- ARIA labels eklendi
- Keyboard navigation desteği
- High contrast mode desteği

### Browser Support

- Modern browserlar (ES2020+)
- Safari, Chrome, Firefox, Edge
- Mobile browserlar

## 🚀 Deployment

Projeyi deploy etmek için:

### Vercel (Önerilen)

```bash
npm run build
# Vercel'e deploy edin
```

### Environment Variables

```bash
NEXT_PUBLIC_BACKEND_URL=your-arktos-backend-url
```

## 👥 Geliştirici Notları

### Kod Kalitesi

- ESLint konfigürasyonu
- Prettier formatting
- TypeScript tip tanımları (optional)
- Component prop validation

### Best Practices

- Clean code principles
- DRY (Don't Repeat Yourself)
- SOLID principles
- Modern React patterns (hooks, functional components)

## 📞 İletişim

Bu proje Mobiversite Front-End Developer pozisyonu için Zafer Gök tarafından geliştirilmiştir.

---

**Not**: Bu proje bir test projesidir ve production kullanımı için ek güvenlik önlemleri alınmalıdır.
