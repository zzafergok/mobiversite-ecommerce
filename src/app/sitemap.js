export default function sitemap() {
  const baseUrl = 'https://www.mobiversite.store'

  // Ana sayfalar
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Kategori sayfaları
  const categories = [
    'electronics',
    "men's clothing",
    "women's clothing",
    'jewelery',
    'spor',
    'kozmetik',
    'anne-bebek',
    'oyuncak',
    'pet-shop',
    'film-muzik',
    'kitap',
    'supermarket',
  ]

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/products?category=${encodeURIComponent(category)}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  // Ürün sayfaları (1-20 arası ID'ler için örnek)
  const productPages = Array.from({ length: 20 }, (_, i) => ({
    url: `${baseUrl}/products/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...productPages]
}
