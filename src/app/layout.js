import './globals.css'

export const metadata = {
  title: {
    default: 'Lar dos Sonhos Imóveis | Apartamentos e Casas em Praia Grande SP',
    template: '%s | Lar dos Sonhos Imóveis - Praia Grande'
  },
  description: 'Encontre apartamentos, casas, coberturas e terrenos em Praia Grande SP. Imóveis selecionados e atendimento exclusivo com Gabriel Bin, CRECI-SP 302244-F. Do Canto do Forte ao Solemar, o imóvel certo para você.',
  keywords: [
    'imóveis praia grande', 'apartamento praia grande', 'casa praia grande',
    'comprar apartamento praia grande', 'alugar apartamento praia grande',
    'imóveis canto do forte', 'imóveis ocian', 'imóveis tupi praia grande',
    'corretor praia grande', 'corretor de imóveis praia grande sp',
    'imóveis litoral sp', 'apartamento frente ao mar praia grande',
    'imóveis praia grande sp', 'comprar casa praia grande sp',
    'aluguel praia grande sp', 'apartamento 2 quartos praia grande',
    'apartamento 3 quartos praia grande', 'cobertura praia grande',
    'terreno praia grande', 'imóvel praia grande litoral paulista',
    'gabriel bin corretor', 'creci 302244', 'lar dos sonhos imóveis',
    'imóvel litoral sul sp', 'baixada santista imóveis'
  ],
  authors: [{ name: 'Gabriel Bin', url: 'https://lardossonhosimoveis.com.br' }],
  creator: 'Gabriel Bin — CRECI-SP 302244-F',
  publisher: 'Lar dos Sonhos Imóveis',
  category: 'real estate',
  classification: 'Imóveis e Corretor',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://lardossonhosimoveis.com.br',
    siteName: 'Lar dos Sonhos Imóveis',
    title: 'Lar dos Sonhos Imóveis | Apartamentos e Casas em Praia Grande SP',
    description: 'Imóveis selecionados e atendimento exclusivo em Praia Grande SP. Apartamentos, casas, coberturas e terrenos. CRECI-SP 302244-F.',
    images: [{
      url: 'https://lardossonhosimoveis.com.br/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Lar dos Sonhos Imóveis — Praia Grande SP',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lar dos Sonhos Imóveis | Praia Grande SP',
    description: 'Imóveis selecionados em Praia Grande. Atendimento exclusivo com Gabriel Bin, CRECI-SP 302244-F.',
    images: ['https://lardossonhosimoveis.com.br/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://lardossonhosimoveis.com.br',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'iHmbgblFVAwFqJAf861E_TrVdaUmwcPWvuWXMKyK1ac',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Schema.org JSON-LD — dados estruturados para Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "RealEstateAgent",
                  "@id": "https://lardossonhosimoveis.com.br/#agent",
                  "name": "Gabriel Bin",
                  "jobTitle": "Corretor de Imóveis",
                  "description": "Corretor autônomo especializado em imóveis em Praia Grande SP. Atendimento exclusivo e personalizado.",
                  "url": "https://lardossonhosimoveis.com.br",
                  "telephone": "+55-13-99999-0000",
                  "areaServed": {
                    "@type": "City",
                    "name": "Praia Grande",
                    "addressRegion": "SP",
                    "addressCountry": "BR"
                  },
                  "hasCredential": "CRECI-SP 302244-F",
                  "knowsAbout": ["Apartamentos", "Casas", "Coberturas", "Terrenos", "Imóveis em Praia Grande"],
                  "image": "https://lardossonhosimoveis.com.br/og-image.jpg",
                  "sameAs": []
                },
                {
                  "@type": "WebSite",
                  "@id": "https://lardossonhosimoveis.com.br/#website",
                  "url": "https://lardossonhosimoveis.com.br",
                  "name": "Lar dos Sonhos Imóveis",
                  "description": "Portal de imóveis selecionados em Praia Grande SP",
                  "publisher": { "@id": "https://lardossonhosimoveis.com.br/#agent" },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://lardossonhosimoveis.com.br/?busca={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://lardossonhosimoveis.com.br/#business",
                  "name": "Lar dos Sonhos Imóveis",
                  "description": "Imóveis selecionados e atendimento exclusivo em Praia Grande SP",
                  "url": "https://lardossonhosimoveis.com.br",
                  "telephone": "+55-13-98220-7098",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Praia Grande",
                    "addressRegion": "SP",
                    "addressCountry": "BR"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": -24.0059,
                    "longitude": -46.4021
                  },
                  "openingHours": "Mo-Sa 08:00-20:00",
                  "priceRange": "$$"
                }
              ]
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
