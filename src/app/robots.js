export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/profile/', '/admin/', '/dashboard/', '/_next/', '/static/'],
    },
    sitemap: 'https://www.mobiversite.store/sitemap.xml',
    host: 'https://www.mobiversite.store',
  }
}
