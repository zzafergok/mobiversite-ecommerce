'use client'

import { useState } from 'react'

import { X, Settings, Info, Shield, BarChart3, Target, Palette } from 'lucide-react'

import { useCookieConsent } from '@/contexts/CookieConsentContext'

import { Card } from '@/components/core/card'
import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Switch } from '@/components/core/switch'

const cookieCategories = {
  essential: {
    title: 'Zorunlu Çerezler',
    description: 'Bu çerezler web sitesinin çalışması için gereklidir ve devre dışı bırakılamaz.',
    icon: Shield,
    required: true,
    examples: 'Oturum yönetimi, güvenlik, sepet bilgileri',
  },
  analytics: {
    title: 'Analitik Çerezler',
    description: 'Bu çerezler sitemizi nasıl kullandığınızı anlamamıza yardımcı olur.',
    icon: BarChart3,
    required: false,
    examples: 'Google Analytics, sayfa görüntüleme istatistikleri',
  },
  marketing: {
    title: 'Pazarlama Çerezler',
    description: 'Bu çerezler size özel reklamlar göstermek için kullanılır.',
    icon: Target,
    required: false,
    examples: 'Facebook Pixel, Google Ads, remarketing',
  },
  functional: {
    title: 'İşlevsel Çerezler',
    description: 'Bu çerezler gelişmiş özellikler ve kişiselleştirme sağlar.',
    icon: Palette,
    required: false,
    examples: 'Dil tercihi, tema ayarları, kullanıcı özelleştirmeleri',
  },
}

export default function CookieBanner() {
  const { showBanner, preferences, acceptAll, rejectAll, updatePreferences, saveCustomPreferences } = useCookieConsent()

  const [showPreferences, setShowPreferences] = useState(false)

  if (!showBanner) return null

  const handleCustomSave = () => {
    saveCustomPreferences()
    setShowPreferences(false)
  }

  return (
    <div className='fixed inset-0 z-50 flex items-end justify-start pointer-events-none'>
      {/* Backdrop when preferences open */}
      {showPreferences && (
        <div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto'
          onClick={() => setShowPreferences(false)}
        />
      )}

      {/* Main Banner */}
      <div className='relative pointer-events-auto'>
        {/* Preferences Modal */}
        {showPreferences && (
          <Card className='absolute bottom-full left-0 mb-4 w-[500px] max-w-[90vw] max-h-[80vh] overflow-y-auto bg-white shadow-xl border-2'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-lg font-semibold text-gray-900 flex items-center space-x-2'>
                  <Settings size={20} />
                  <span>Çerez Tercihleri</span>
                </h3>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => setShowPreferences(false)}
                  className='text-gray-500 hover:text-gray-700'
                >
                  <X size={18} />
                </Button>
              </div>

              <div className='space-y-6'>
                {Object.entries(cookieCategories).map(([key, category]) => {
                  const IconComponent = category.icon
                  const isEnabled = preferences[key]
                  const isRequired = category.required

                  return (
                    <div key={key} className='border border-gray-200 rounded-lg p-4'>
                      <div className='flex items-start justify-between mb-3'>
                        <div className='flex items-center space-x-3'>
                          <div
                            className={`p-2 rounded-full ${
                              isRequired
                                ? 'bg-blue-100 text-blue-600'
                                : isEnabled
                                  ? 'bg-green-100 text-green-600'
                                  : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            <IconComponent size={16} />
                          </div>
                          <div>
                            <h4 className='font-medium text-gray-900 flex items-center space-x-2'>
                              <span>{category.title}</span>
                              {isRequired && (
                                <Badge variant='outline' className='text-xs'>
                                  Zorunlu
                                </Badge>
                              )}
                            </h4>
                            <p className='text-sm text-gray-600 mt-1'>{category.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={isEnabled}
                          onCheckedChange={(checked) => updatePreferences(key, checked)}
                          disabled={isRequired}
                          className='shrink-0'
                        />
                      </div>
                      <div className='text-xs text-gray-500  rounded p-2 ml-11'>
                        <strong>Örnekler:</strong> {category.examples}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className='flex space-x-3 mt-6 pt-4 border-t'>
                <Button onClick={handleCustomSave} className='flex-1 bg-orange-600 hover:bg-orange-700 text-white'>
                  Tercihleri Kaydet
                </Button>
                <Button variant='outline' onClick={() => setShowPreferences(false)} className='px-6'>
                  İptal
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Main Banner */}
        <Card className='m-4 ml-6 w-[420px] max-w-[calc(100vw-3rem)] bg-white shadow-lg border-2 border-gray-200'>
          <div className='p-5'>
            <div className='flex items-start space-x-3 mb-4'>
              <div className='p-2 bg-orange-100 text-orange-600 rounded-full shrink-0'>
                <Info size={18} />
              </div>
              <div className='flex-1 min-w-0'>
                <h3 className='font-semibold text-gray-900 mb-2'>Çerez Kullanımı</h3>
                <p className='text-sm text-gray-600 leading-relaxed'>
                  Web sitemizin düzgün çalışması için zorunlu çerezler kullanıyoruz. Deneyiminizi iyileştirmek için
                  opsiyonel çerezler de kullanabiliriz.
                </p>
              </div>
            </div>

            <div className='flex flex-col space-y-3'>
              <div className='flex space-x-3'>
                <Button onClick={acceptAll} className='flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium'>
                  Tümünü Kabul Et
                </Button>
                <Button
                  onClick={rejectAll}
                  variant='outline'
                  className='flex-1 border-gray-300 text-gray-700 hover: font-medium'
                >
                  Reddet
                </Button>
              </div>

              <Button
                onClick={() => setShowPreferences(true)}
                variant='ghost'
                className='w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-medium flex items-center justify-center space-x-2'
              >
                <Settings size={16} />
                <span>Tercihleri Özelleştir</span>
              </Button>
            </div>

            <div className='mt-4 pt-3 border-t border-gray-200'>
              <p className='text-xs text-gray-500 text-center'>
                Daha fazla bilgi için{' '}
                <a
                  href='/cookie-policy'
                  className='text-orange-600 hover:text-orange-700 underline'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Çerez Politikamızı
                </a>{' '}
                inceleyebilirsiniz.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

// Cookie Widget - Always visible button to reopen preferences
export function CookieWidget() {
  const { reopenBanner, consentGiven } = useCookieConsent()

  if (!consentGiven) return null

  return (
    <Button
      onClick={reopenBanner}
      className='fixed bottom-4 left-4 z-40 bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg md:block hidden'
      size='icon'
      title='Çerez Ayarları'
    >
      <Settings size={18} />
    </Button>
  )
}
