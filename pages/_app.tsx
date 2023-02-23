import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Noto_Sans_JP } from '@next/font/google'

// https://nextjs.org/docs/api-reference/next/font
const noto = Noto_Sans_JP({
  weight: ['400','900'],
  subsets: ['latin'],
  display: 'block'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${noto.className} main notionate-override-callout`}>
      <Component {...pageProps} />
    </div>
  )
}
