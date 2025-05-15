import "./globals.css";
import { Web3OnboardProviderWrapper } from '@/components/Web3OnboardProviderWrapper'
import { Header } from '@/components/Header'
import { QueryProvider } from '@/providers/queryProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: 'white',
          margin: 0,
          minHeight: '100vh',
          fontFamily: 'Arial, sans-serif',
        }}

      >
        <Web3OnboardProviderWrapper>
          <Header />
          <QueryProvider>
            {children}
          </QueryProvider>
        </Web3OnboardProviderWrapper>
      </body>
    </html>
  );
}
