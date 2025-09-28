import { jsonServerService } from './jsonServerService'
import { neonDbService } from './neonDbService'
import { vercelApiService } from './vercelApiService'

// Bu fonksiyon environment context'e göre doğru servisi döndürür
export function getApiService(environment = 'production') {
  // Production environment'da Vercel API kullan (JSON Server compatible)
  if (environment === 'production' || process.env.NODE_ENV === 'production') {
    return vercelApiService
  }

  return environment === 'neon-db' ? neonDbService : jsonServerService
}

// Hook kullanmayan yerler için default export
// Production'da Vercel API, development'da JSON Server
export const apiService = process.env.NODE_ENV === 'production' ? vercelApiService : jsonServerService

export default apiService
