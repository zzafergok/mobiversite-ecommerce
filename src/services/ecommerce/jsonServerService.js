import axios from 'axios'

const jsonServerApi = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

export const jsonServerService = {
  // Products
  async getAllProducts() {
    const response = await jsonServerApi.get('/products')
    return response.data
  },

  async getProduct(id) {
    const response = await jsonServerApi.get(`/products/${id}`)
    return response.data
  },

  async getProductsByCategory(category) {
    const response = await jsonServerApi.get(`/products?category=${category}`)
    return response.data
  },

  // Users
  async getUserByCredentials(username, password) {
    const response = await jsonServerApi.get(`/users?username=${username}&password=${password}`)
    return response.data[0] || null
  },

  async getUserById(id) {
    const response = await jsonServerApi.get(`/users/${id}`)
    return response.data
  },

  async createUser(userData) {
    const response = await jsonServerApi.post('/users', userData)
    return response.data
  },

  async updateUser(id, userData) {
    const response = await jsonServerApi.put(`/users/${id}`, userData)
    return response.data
  },

  async updateUserPartial(id, userData) {
    const response = await jsonServerApi.patch(`/users/${id}`, userData)
    return response.data
  },

  async checkUsernameExists(username) {
    const response = await jsonServerApi.get(`/users?username=${username}`)
    return response.data.length > 0
  },

  async checkEmailExists(email) {
    const response = await jsonServerApi.get(`/users?email=${email}`)
    return response.data.length > 0
  },

  // Orders
  async getUserOrders(userId) {
    const response = await jsonServerApi.get(`/orders?userId=${userId}`)
    return response.data
  },

  async getOrdersByUserId(userId) {
    const response = await jsonServerApi.get(`/orders?userId=${userId}`)
    return response.data
  },

  async createOrder(orderData) {
    const response = await jsonServerApi.post('/orders', orderData)
    return response.data
  },

  async getOrder(id) {
    const response = await jsonServerApi.get(`/orders/${id}`)
    return response.data
  },

  // Carts
  async getUserCart(userId) {
    const response = await jsonServerApi.get(`/carts?userId=${userId}`)
    if (response.data.length > 0) {
      return response.data.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))[0]
    }
    return null
  },

  async updateUserCart(userId, items) {
    const response = await jsonServerApi.post('/carts', {
      userId,
      items,
      timestamp: Date.now(),
    })
    return response.data
  },

  async clearUserCart(userId) {
    const response = await jsonServerApi.post('/carts', {
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

export default jsonServerService