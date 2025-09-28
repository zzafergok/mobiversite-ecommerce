import { jsonServerService } from './jsonServerService'
import { neonDbService } from './neonDbService'
import { staticDataService } from './staticDataService'

// Bu fonksiyon environment context'e göre doğru servisi döndürür
export function getApiService(environment = 'production') {
  // Production environment'da (Vercel) static data kullan
  if (environment === 'production' || process.env.NODE_ENV === 'production') {
    return staticDataService
  }

  return environment === 'neon-db' ? neonDbService : jsonServerService
}

// Hook kullanmayan yerler için default export
// Production'da static data, development'da json server
export const apiService = process.env.NODE_ENV === 'production' ? staticDataService : jsonServerService

export default apiService
