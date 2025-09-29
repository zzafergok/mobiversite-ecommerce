import { jsonServerService } from './jsonServerService'

// Her zaman jsonServerService kullan (environment variable'a göre doğru URL'yi seçer)
export const apiService = jsonServerService

export default apiService
