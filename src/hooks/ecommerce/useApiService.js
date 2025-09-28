import { useEnvironment } from '@/contexts/EnvironmentContext'
import { getApiService } from '@/services/ecommerce/apiService'

export function useApiService() {
  const { environment } = useEnvironment()
  return getApiService(environment)
}

export default useApiService
