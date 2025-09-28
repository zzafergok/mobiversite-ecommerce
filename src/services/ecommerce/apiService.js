import { jsonServerService } from './jsonServerService'
import { neonDbService } from './neonDbService'

// Bu fonksiyon environment context'e göre doğru servisi döndürür
export function getApiService(environment = 'json-server') {
  return environment === 'neon-db' ? neonDbService : jsonServerService
}

// Hook kullanmayan yerler için default export
export const apiService = jsonServerService

export default apiService
