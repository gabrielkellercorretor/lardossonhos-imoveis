import './globals.css'

export const metadata = {
  title: 'Gabriel Bin Imóveis | Praia Grande - SP',
  description: 'Imóveis selecionados e atendimento exclusivo e personalizado em Praia Grande. Apartamentos, casas, terrenos e imóveis comerciais. CRECI-SP 302244-F',
  keywords: 'imóveis praia grande, corretor praia grande, apartamento praia grande, casa praia grande, aluguel praia grande, imóveis litoral sp',
  openGraph: {
    title: 'Gabriel Bin Imóveis | Praia Grande',
    description: 'Imóveis selecionados e atendimento exclusivo e personalizado em Praia Grande. CRECI-SP 302244-F',
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
