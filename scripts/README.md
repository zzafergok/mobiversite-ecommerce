# Development Scripts

Bu klasör, projenin geliştirme sürecini otomatikleştiren ve kolaylaştıran script'leri içerir.

## 📁 Scripts

### `dev-start.js` - Akıllı Geliştirme Ortamı

Bu script, projeyi geliştirme modunda başlatmak için kullanılan akıllı bir otomasyondur. Manual olarak portları temizleme, servisleri başlatma ve konfigürasyon güncellemelerini yapma zahmetinden kurtarır.

#### 🎯 Ne Yapar?

1. **Port Temizliği**: Kullanılacak portlarda (3000, 3001) çalışan eski süreçleri otomatik olarak sonlandırır
2. **Konfigürasyon Güncelleme**: Servis dosyalarındaki port numaralarını otomatik günceller
3. **Servis Başlatma**: JSON Server ve Next.js'i doğru sırayla ve doğru portlarda başlatır
4. **Hata Yönetimi**: Port çakışmalarını ve diğer yaygın hataları akıllıca handle eder

#### ⚙️ Nasıl Çalışır?

```bash
# Direkt script'i çalıştırma
node scripts/dev-start.js

# Package.json script'i ile (önerilen)
npm run dev
```

#### 🔧 İç Yapı

##### 1. Port Konfigürasyonu

```javascript
const PORTS = {
  nextjs: 3000, // Next.js frontend
  jsonServer: 3001, // JSON Server API
}
```

##### 2. Port Temizleme Süreci

- `lsof -ti:PORT` komutu ile portları kullanan süreçleri bulur
- `kill -9 PID` ile süreçleri zorla sonlandırır
- JSON Server için ek `pkill -f "json-server"` komutu çalıştırır

##### 3. Konfigürasyon Güncelleme

- `src/services/jsonServerService.js` dosyasındaki API URL'ini günceller
- `package.json` içindeki json-server script'ini doğru port ile günceller

##### 4. Servis Başlatma Sırası

1. **JSON Server** önce başlar (port 3001)
2. **2 saniye bekleme** (JSON Server'ın tam olarak hazır olması için)
3. **Next.js** başlar (port 3000)

#### 🚦 Console Çıktısı

Script çalışırken şu bilgileri görürsünüz:

```
🔧 Smart Development Environment Setup
=====================================
🧹 Cleaning up ports...
✅ Ports are clean - ready to start
⚙️  Updating service configurations...
✅ Service configurations updated
🚀 Starting development servers...
✅ JSON Server: http://localhost:3001
✅ Next.js: http://localhost:3000

🎉 Development environment ready!
📱 Frontend: http://localhost:3000
🔌 API: http://localhost:3001
```

#### 🛡️ Hata Yönetimi

##### Yaygın Hatalar ve Çözümleri:

**EADDRINUSE (Port kullanımda)**

- Script otomatik olarak portları temizler
- Eğer hala sorun varsa, script durur ve tekrar denemenizi söyler

**Process bulunamadı**

- Normal durum, hata olarak gösterilmez
- Silent mode ile sessizce handle edilir

**JSON Server başlamadı**

- 2 saniye bekleme süresi ile çözülür
- Gerekirse manuel `npm run json-server` deneyebilirsiniz

#### 🎛️ Özelleştirme

##### Port Değiştirme:

```javascript
const PORTS = {
  nextjs: 4000, // 3000 yerine 4000 kullan
  jsonServer: 4001, // 3001 yerine 4001 kullan
}
```

##### Bekleme Süresini Değiştirme:

```javascript
setTimeout(() => {
  // Next.js başlatma kodu
}, 3000) // 2000'den 3000'e çıkar
```

#### 🔄 Process Yönetimi

Script, `SIGINT` (Ctrl+C) sinyali aldığında:

- Çalışan tüm servisleri temiz bir şekilde kapatır
- Port'ları serbest bırakır
- Graceful shutdown yapar

#### 💡 İpuçları

1. **Her zaman `npm run dev` kullanın** - Manuel script çalıştırmak yerine
2. **Port çakışması durumunda** - Script'i tekrar çalıştırın, otomatik çözecektir
3. **Servisleri kapatmak için** - Ctrl+C kullanın, script temiz kapanış yapacaktır
4. **Konfigürasyon sorunları** - Script her çalıştığında dosyaları günceller

#### 🚨 Güvenlik Notları

- Script yalnızca development ortamı için tasarlanmıştır
- Production'da **asla** kullanmayın
- Process killing işlemleri development makinenizde güvenlidir
- Sadece belirtilen portlardaki süreçleri etkiler

---

### 📚 Ek Bilgiler

Bu script, senior developer best practice'lerini takip eder:

- **Fail-fast**: Sorun olduğunda hızlıca durur
- **Silent errors**: Beklenen hataları gizler, gerçek sorunları gösterir
- **Graceful handling**: Süreçleri temiz bir şekilde yönetir
- **Self-documenting**: Console çıktısı ne olduğunu açık şekilde belirtir

Junior developer'lar için önemli: Bu script'i değiştirmeden önce yedek alın ve test ortamında deneyin!
