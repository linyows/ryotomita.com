import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Noto_Sans_JP } from '@next/font/google'

const noto = Noto_Sans_JP({ weight: ['400', '900'], subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${noto.className} main notionate-override-callout`}>
      <Component {...pageProps} />
    </div>
  )
}
