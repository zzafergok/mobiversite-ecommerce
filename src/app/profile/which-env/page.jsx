'use client'

import { useEnvironment } from '@/contexts/EnvironmentContext'
import { ArrowLeft, Database, Server, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/core/button'
import { Card, CardContent } from '@/components/core/card'
import { Badge } from '@/components/core/badge'
import { Alert, AlertDescription } from '@/components/core/alert'

export default function WhichEnvPage() {
  const router = useRouter()
  const { environment, switchEnvironment } = useEnvironment()

  const environments = [
    {
      id: 'json-server',
      name: 'JSON Server',
      description: "Yerel JSON Server kullanarak mock API'den veri çekir. Development ve test için idealdir.",
      features: ['Hızlı geliştirme', 'Offline çalışma', 'Mock veriler', 'Basit kurulum'],
      icon: Server,
      status: 'Aktif - Mock veriler kullanılıyor',
    },
    {
      id: 'neon-db',
      name: 'Neon Database',
      description: 'Arktos backend ile Neon PostgreSQL veritabanından gerçek veriler alır.',
      features: ['Gerçek veriler', 'Canlı API', 'Veritabanı persistance', 'Production ready'],
      icon: Database,
      status: 'Hazır - Gerçek veriler kullanılacak',
    },
  ]

  const handleEnvironmentChange = (envId) => {
    switchEnvironment(envId)
  }

  return (
    <div className='max-w-4xl mx-auto'>
      {/* Back Button */}
      <Button
        variant='ghost'
        className='mb-6 p-0 h-auto text-blue-600 hover:text-blue-700'
        onClick={() => router.push('/profile')}
      >
        <div className='inline-flex items-center gap-2'>
          <ArrowLeft size={20} />
          Profil'e Dön
        </div>
      </Button>

      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>API Ortamı Seçimi</h1>
        <p className='text-gray-600 dark:text-gray-400'>
          Uygulamanın hangi veri kaynağını kullanacağını seçin. Bu ayar tarayıcınızda saklanır ve sadece sizin için
          geçerlidir.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {environments.map((env) => {
          const IconComponent = env.icon
          const isSelected = environment === env.id

          return (
            <Card
              key={env.id}
              className={`relative cursor-pointer transition-all hover:shadow-lg ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => handleEnvironmentChange(env.id)}
            >
              <CardContent className='p-6'>
                {/* Selection Indicator */}
                {isSelected && (
                  <div className='absolute top-4 right-4'>
                    <Badge className='bg-blue-500 text-white rounded-full p-1'>
                      <Check size={16} />
                    </Badge>
                  </div>
                )}

                <div className='flex items-center gap-3 mb-4'>
                  <div
                    className={`p-3 rounded-lg ${
                      isSelected
                        ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>{env.name}</h3>
                    <p
                      className={`text-sm ${
                        isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {env.status}
                    </p>
                  </div>
                </div>

                <p className='text-gray-600 dark:text-gray-400 mb-4'>{env.description}</p>

                <div className='space-y-2'>
                  <h4 className='font-medium text-gray-900 dark:text-white'>Özellikler:</h4>
                  <ul className='space-y-1'>
                    {env.features.map((feature, index) => (
                      <li key={index} className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                        <div className='w-1.5 h-1.5 bg-gray-400 rounded-full'></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => handleEnvironmentChange(env.id)}
                  className='w-full mt-4'
                  variant={isSelected ? 'default' : 'secondary'}
                  disabled={isSelected}
                >
                  {isSelected ? 'Seçili' : 'Seç'}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Alert variant='warning' className='mt-8'>
        <AlertDescription>
          <h4 className='font-medium mb-2'>⚠️ Önemli Bilgi</h4>
          <p className='text-sm'>
            Bu ayar sadece veri kaynağını değiştirir. Neon Database seçeneği için backend sunucusunun çalışıyor olması
            gerekir. JSON Server seçeneği her zaman kullanılabilir ve test verilerini kullanır.
          </p>
        </AlertDescription>
      </Alert>

      <Card className='mt-6 text-center'>
        <CardContent className='p-4'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Şu anda aktif ortam:{' '}
            <Badge variant='secondary' className='ml-1'>
              {environment === 'json-server' ? 'JSON Server' : 'Neon Database'}
            </Badge>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
