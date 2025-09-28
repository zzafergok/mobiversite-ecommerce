import { vercelApiService } from './vercelApiService'
import { jsonServerService } from './jsonServerService'

// Production'da vercelApiService, development'da jsonServerService kullan
export const apiService = process.env.NODE_ENV === 'production' ? vercelApiService : jsonServerService

export default apiService
