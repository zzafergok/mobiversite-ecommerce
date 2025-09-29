'use client'

export function WebsiteStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mobiversite Store',
    alternateName: 'Mobiversite E-Ticaret',
    url: 'https://www.mobiversite.store',
    description: "Türkiye'nin en iyi online alışveriş deneyimi. Elektronik, moda, takı ve binlerce ürün.",
    inLanguage: 'tr-TR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.mobiversite.store/products?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mobiversite E-Ticaret Ltd.',
      url: 'https://www.mobiversite.store',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.mobiversite.store/logo.png',
        width: 250,
        height: 60,
      },
    },
  }

  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function OrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mobiversite Store',
    alternateName: 'Mobiversite E-Ticaret',
    url: 'https://www.mobiversite.store',
    logo: 'https://www.mobiversite.store/logo.png',
    description: "Türkiye'nin yeni nesil e-ticaret platformu. Güvenli alışveriş, hızlı teslimat.",
    founder: {
      '@type': 'Person',
      name: 'Mobiversite Ekibi',
    },
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressLocality: 'İstanbul',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'Turkish',
    },
    sameAs: ['https://www.mobiversite.store'],
  }

  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function ProductStructuredData({ product }) {
  if (!product) return null

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.image,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'Mobiversite Store',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Mobiversite Store',
      },
      url: `https://www.mobiversite.store/products/${product.id}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '127',
    },
  }

  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function BreadcrumbStructuredData({ items }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
