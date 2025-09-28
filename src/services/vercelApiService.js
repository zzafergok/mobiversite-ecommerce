import axios from 'axios'

// Production API endpoint
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== 'undefined' ? `${window.location.origin}/api` : 'http://localhost:3000/api')

const vercelApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
})

// Request interceptor for debugging
vercelApi.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('API Request Error:', error)
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
vercelApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data || error.message)

    // If custom domain fails, fallback to relative URLs in production
    if (process.env.NODE_ENV === 'production' && error.code === 'ENOTFOUND') {
      console.warn('Custom domain failed, consider using relative URLs')
    }

    return Promise.reject(error)
  },
)

export const vercelApiService = {
  // Products
  async getAllProducts() {
    const response = await vercelApi.get('/products')
    return response.data
  },

  async getProduct(id) {
    const response = await vercelApi.get(`/products/${id}`)
    return response.data
  },

  async getProductsByCategory(category) {
    const response = await vercelApi.get(`/products?category=${category}`)
    return response.data
  },

  // Users
  async getUserByCredentials(username, password) {
    const response = await vercelApi.get(`/users?username=${username}&password=${password}`)
    return response.data[0] || null
  },

  async getUserById(id) {
    const response = await vercelApi.get(`/users/${id}`)
    return response.data
  },

  async createUser(userData) {
    const response = await vercelApi.post('/users', userData)
    return response.data
  },

  async updateUser(id, userData) {
    const response = await vercelApi.put(`/users/${id}`, userData)
    return response.data
  },

  async updateUserPartial(id, userData) {
    const response = await vercelApi.patch(`/users/${id}`, userData)
    return response.data
  },

  async checkUsernameExists(username) {
    const response = await vercelApi.get(`/users?username=${username}`)
    return response.data.length > 0
  },

  async checkEmailExists(email) {
    const response = await vercelApi.get(`/users?email=${email}`)
    return response.data.length > 0
  },

  // Orders
  async getUserOrders(userId) {
    const response = await vercelApi.get(`/orders?userId=${userId}`)
    return response.data
  },

  async getOrdersByUserId(userId) {
    const response = await vercelApi.get(`/orders?userId=${userId}`)
    return response.data
  },

  async createOrder(orderData) {
    const response = await vercelApi.post('/orders', orderData)
    return response.data
  },

  async getOrder(id) {
    const response = await vercelApi.get(`/orders/${id}`)
    return response.data
  },

  // Carts
  async getUserCart(userId) {
    const response = await vercelApi.get(`/carts?userId=${userId}`)
    // Get the most recent cart (highest timestamp)
    if (response.data.length > 0) {
      return response.data.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))[0]
    }
    return null
  },

  async updateUserCart(userId, items) {
    const response = await vercelApi.post('/carts', {
      userId,
      items,
      timestamp: Date.now(),
    })
    return response.data
  },

  async clearUserCart(userId) {
    const response = await vercelApi.post('/carts', {
      userId,
      items: [],
      timestamp: Date.now(),
    })
    return response.data
  },

  // Categories
  async getCategories() {
    const products = await this.getAllProducts()
    const categories = [...new Set(products.map((product) => product.category))]
    return categories
  },
}

export default vercelApiService
