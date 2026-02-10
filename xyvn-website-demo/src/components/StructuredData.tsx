export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'XYVN',
    url: 'https://xyvn.com',
    logo: 'https://xyvn.com/logo.png',
    description: '专注网站开发、APP开发和产品设计的科技公司',
    address: {
      '@type': 'PostalAddress',
      addressLocality: '深圳',
      addressRegion: '广东省',
      addressCountry: 'CN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+86-138-0000-0000',
      contactType: '客户服务',
      email: 'hello@xyvn.com',
    },
    sameAs: [
      'https://github.com/xyvn',
      'https://twitter.com/xyvn',
      'https://linkedin.com/company/xyvn',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'XYVN',
    url: 'https://xyvn.com',
    description: '打造卓越数字体验',
    publisher: {
      '@type': 'Organization',
      name: 'XYVN',
    },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: '网站开发与APP开发',
    provider: {
      '@type': 'Organization',
      name: 'XYVN',
    },
    areaServed: 'CN',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '数字服务',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '网站开发',
            description: '高性能、响应式网站开发服务',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'APP开发',
            description: 'iOS和Android原生应用开发',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'UI/UX设计',
            description: '用户体验设计和界面设计服务',
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
