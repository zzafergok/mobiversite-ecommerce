import axios from 'axios'

const JSON_SERVER_BASE_URL = 'http://localhost:3001'

const jsonServerApi = axios.create({
  baseURL: JSON_SERVER_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const jsonServerService = {
  // Products
  async getAllProducts() {
    const response = await jsonServerApi.get('/products')
    return response.data
  },

  async getProduct(id) {
    const response = await jsonServerApi.get(`/products?id=${id}`)
    return response.data[0] || null
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
    const response = await jsonServerApi.get(`/users?id=${id}`)
    return response.data[0] || null
  },

  async createUser(userData) {
    const response = await jsonServerApi.post('/users', {
      ...userData,
      createdAt: new Date().toISOString(),
      id: Date.now().toString(), // Simple ID generation
    })
    return response.data
  },

  async updateUser(id, userData) {
    const response = await jsonServerApi.put(`/users/${id}`, {
      ...userData,
      updatedAt: new Date().toISOString(),
    })
    return response.data
  },

  async updateUserPartial(id, userData) {
    const response = await jsonServerApi.patch(`/users/${id}`, {
      ...userData,
      updatedAt: new Date().toISOString(),
    })
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
    const response = await jsonServerApi.get(`/orders?id=${id}`)
    return response.data[0] || null
  },

  // Carts
  async getUserCart(userId) {
    const response = await jsonServerApi.get(`/carts?userId=${userId}`)
    // Get the most recent cart (highest timestamp)
    if (response.data.length > 0) {
      return response.data.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))[0]
    }
    return null
  },

  async updateUserCart(userId, items) {
    // JSON Server 1.0.0-beta doesn't support updates properly
    // We'll just create a new cart entry each time and get the latest one
    const response = await jsonServerApi.post('/carts', {
      userId,
      items,
      timestamp: Date.now(), // Add timestamp to track latest
    })
    return response.data
  },

  async clearUserCart(userId) {
    // Create empty cart
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
