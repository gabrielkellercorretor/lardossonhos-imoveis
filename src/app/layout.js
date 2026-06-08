import './globals.css'

export const metadata = {
  title: 'Gabriel Bin Imóveis | Santos e Região',
  description: 'Corretor autônomo em Santos e região. Apartamentos, casas, terrenos e imóveis comerciais para compra e aluguel. CRECI-SP 302244-F',
  keywords: 'imóveis santos, corretor santos, apartamento santos, casa santos, aluguel santos',
  openGraph: {
    title: 'Gabriel Bin Imóveis',
    description: 'Corretor autônomo em Santos e região. CRECI-SP 302244-F',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
