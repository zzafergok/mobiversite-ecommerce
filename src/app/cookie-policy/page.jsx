'use client'

import { Shield, BarChart3, Target, Palette, Clock, FileText } from 'lucide-react'

import { Card } from '@/components/core/card'
import { Badge } from '@/components/core/badge'

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      title: 'Zorunlu Çerezler',
      icon: Shield,
      color: 'bg-gray-100 text-gray-600',
      description: 'Web sitesinin temel işlevlerini yerine getirmesi için gerekli çerezler.',
      duration: 'Oturum süresi',
      examples: ['Kullanıcı oturum bilgileri (auth-token)', 'Sepet içeriği', 'Güvenlik çerezleri', 'Dil tercihleri'],
      legal: 'Bu çerezler web sitesinin çalışması için zorunludur ve kullanıcı onayı gerektirmez.',
    },
    {
      title: 'Analitik Çerezler',
      icon: BarChart3,
      color: 'bg-green-100 text-green-600',
      description: 'Kullanıcıların web sitesini nasıl kullandığını anlamamıza yardımcı olan çerezler.',
      duration: '2 yıl',
      examples: [
        'Google Analytics',
        'Sayfa görüntüleme istatistikleri',
        'Kullanıcı davranış analizi',
        'Site performans ölçümleri',
      ],
      legal: 'Bu çerezler için kullanıcı onayı gereklidir.',
    },
    {
      title: 'Pazarlama Çerezleri',
      icon: Target,
      color: 'bg-orange-100 text-orange-600',
      description: 'Kullanıcılara özel reklamlar göstermek için kullanılan çerezler.',
      duration: '1 yıl',
      examples: ['Facebook Pixel', 'Google Ads', 'Remarketing çerezleri', 'Sosyal medya entegrasyonları'],
      legal: 'Bu çerezler için kullanıcı onayı gereklidir.',
    },
    {
      title: 'İşlevsel Çerezler',
      icon: Palette,
      color: 'bg-purple-100 text-purple-600',
      description: 'Gelişmiş özellikler ve kişiselleştirme sağlayan çerezler.',
      duration: '1 yıl',
      examples: [
        'Tema tercihleri (koyu/açık mod)',
        'Dil ayarları',
        'Bölge tercihleri',
        'Kullanıcı arayüz özelleştirmeleri',
      ],
      legal: 'Bu çerezler için kullanıcı onayı gereklidir.',
    },
  ]

  return (
    <div className='min-h-screen  py-12'>
      <div className='max-w-4xl mx-auto px-4'>
        <div className='text-center mb-12'>
          <div className='flex items-center justify-center mb-4'>
            <div className='p-3 bg-orange-100 text-orange-600 rounded-full'>
              <FileText size={32} />
            </div>
          </div>
          <h1 className='text-3xl font-bold text-gray-900 mb-4'>Çerez Politikası</h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Mobiversite E-Commerce olarak çerez kullanımımız hakkında şeffaf bilgilendirme yapmaktayız.
          </p>
          <div className='flex items-center justify-center mt-4 text-sm text-gray-500'>
            <Clock size={16} className='mr-2' />
            Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
          </div>
        </div>

        <Card className='mb-8 p-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>Çerez Nedir?</h2>
          <p className='text-gray-600 leading-relaxed mb-4'>
            Çerezler, ziyaret ettiğiniz web sitesi tarafından bilgisayarınıza veya mobil cihazınıza kaydedilen küçük
            metin dosyalarıdır. Bu dosyalar web sitesinin daha iyi çalışmasını, kullanıcı deneyimini iyileştirmesini ve
            site sahiplerine analitik bilgi sağlamasını mümkün kılar.
          </p>
          <p className='text-gray-600 leading-relaxed'>
            Çerezler kişisel olarak sizi tanımlayabilecek bilgiler içermez, ancak size daha kişiselleştirilmiş bir web
            deneyimi sunmamıza yardımcı olur.
          </p>
        </Card>

        <div className='space-y-6 mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 text-center'>Kullandığımız Çerez Türleri</h2>

          {cookieTypes.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.title} className='p-6'>
                <div className='flex items-start space-x-4'>
                  <div className={`p-3 rounded-full ${category.color} shrink-0`}>
                    <IconComponent size={24} />
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center space-x-3 mb-3'>
                      <h3 className='text-xl font-semibold text-gray-900'>{category.title}</h3>
                      <Badge variant='outline' className='text-xs'>
                        Süre: {category.duration}
                      </Badge>
                    </div>

                    <p className='text-gray-600 mb-4'>{category.description}</p>

                    <div className='grid md:grid-cols-2 gap-4'>
                      <div>
                        <h4 className='font-medium text-gray-900 mb-2'>Örnekler:</h4>
                        <ul className='text-sm text-gray-600 space-y-1'>
                          {category.examples.map((example, index) => (
                            <li key={index} className='flex items-center'>
                              <span className='w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 shrink-0'></span>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className='font-medium text-gray-900 mb-2'>Yasal Durum:</h4>
                        <p className='text-sm text-gray-600  p-3 rounded'>{category.legal}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <Card className='p-6 mb-8'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>Çerez Yönetimi</h2>
          <div className='space-y-4 text-gray-600'>
            <p>
              <strong>Çerez Tercihleri:</strong> Bu web sitesinde çıkan çerez banner'ından tercihlerinizi
              yönetebilirsiniz. Zorunlu çerezler dışında tüm çerez kategorilerini kabul etmeyebilir veya seçici
              davranabilirsiniz.
            </p>
            <p>
              <strong>Tarayıcı Ayarları:</strong> Çoğu web tarayıcısı çerezleri otomatik olarak kabul edecek şekilde
              ayarlanmıştır, ancak tarayıcınızın ayarlarından çerezleri devre dışı bırakabilir veya çerezler
              ayarlandığında uyarı alabilirsiniz.
            </p>
            <p>
              <strong>Çerez Silme:</strong> Daha önce kabul ettiğiniz çerezleri tarayıcınızın ayarlarından
              silebilirsiniz. Bu durumda bazı site özelliklerinin çalışmaması mümkündür.
            </p>
          </div>
        </Card>

        <Card className='p-6 mb-8'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>Üçüncü Taraf Çerezleri</h2>
          <p className='text-gray-600 mb-4'>
            Web sitemizde üçüncü taraf hizmetleri kullanabilmekteyiz. Bu hizmetler kendi çerezlerini kurabilir:
          </p>
          <ul className='text-gray-600 space-y-2'>
            <li className='flex items-start'>
              <span className='w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 mt-2 shrink-0'></span>
              <span>
                <strong>Google Analytics:</strong> Site kullanımını analiz etmek için
              </span>
            </li>
            <li className='flex items-start'>
              <span className='w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 mt-2 shrink-0'></span>
              <span>
                <strong>Sosyal Medya Eklentileri:</strong> İçerik paylaşımı için
              </span>
            </li>
            <li className='flex items-start'>
              <span className='w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 mt-2 shrink-0'></span>
              <span>
                <strong>Ödeme Sağlayıcıları:</strong> Güvenli ödeme işlemleri için
              </span>
            </li>
          </ul>
        </Card>

        <Card className='p-6 bg-orange-50 border-orange-200'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>İletişim</h2>
          <p className='text-gray-600 mb-4'>
            Çerez politikamız hakkında sorularınız varsa bizimle iletişime geçebilirsiniz:
          </p>
          <div className='text-gray-600 space-y-2'>
            <p>
              <strong>E-posta:</strong> privacy@mobiversite.com
            </p>
            <p>
              <strong>Adres:</strong> Mobiversite E-Commerce, İstanbul, Türkiye
            </p>
            <p>
              <strong>Güncellemeler:</strong> Bu politika gerektiğinde güncellenir ve değişiklikler bu sayfada
              yayınlanır.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
