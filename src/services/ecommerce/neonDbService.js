import axios from 'axios'

// Bu servis Arktos backend URL'i ile çalışacak
// Şu anda placeholder olarak localhost:3002 kullanıyoruz
const NEON_DB_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3002'

const neonDbApi = axios.create({
  baseURL: `${NEON_DB_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Cookie-based auth için
})

export const neonDbService = {
  // Products
  async getAllProducts() {
    const response = await neonDbApi.get('/products')
    return response.data
  },

  async getProduct(id) {
    const response = await neonDbApi.get(`/products/${id}`)
    return response.data
  },

  async getProductsByCategory(category) {
    const response = await neonDbApi.get(`/products?category=${category}`)
    return response.data
  },

  // Users & Auth
  async login(credentials) {
    const response = await neonDbApi.post('/auth/login', credentials)
    return response.data
  },

  async logout() {
    const response = await neonDbApi.post('/auth/logout')
    return response.data
  },

  async getCurrentUser() {
    const response = await neonDbApi.get('/auth/me')
    return response.data
  },

  async getUserById(id) {
    const response = await neonDbApi.get(`/users/${id}`)
    return response.data
  },

  // Orders
  async getUserOrders(userId) {
    const response = await neonDbApi.get(`/orders?userId=${userId}`)
    return response.data
  },

  async getOrdersByUserId(userId) {
    const response = await neonDbApi.get(`/orders?userId=${userId}`)
    return response.data
  },

  async createOrder(orderData) {
    const response = await neonDbApi.post('/orders', orderData)
    return response.data
  },

  async getOrder(id) {
    const response = await neonDbApi.get(`/orders/${id}`)
    return response.data
  },

  // Carts
  async getUserCart(userId) {
    const response = await neonDbApi.get(`/carts?userId=${userId}`)
    return response.data[0] || null
  },

  async updateUserCart(userId, items) {
    const response = await neonDbApi.post('/carts/sync', {
      userId,
      items,
    })
    return response.data
  },

  async clearUserCart(userId) {
    const response = await neonDbApi.delete(`/carts?userId=${userId}`)
    return response.data
  },

  // Categories
  async getCategories() {
    const response = await neonDbApi.get('/categories')
    return response.data
  },
}

export default neonDbService
