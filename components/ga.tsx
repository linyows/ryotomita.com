import React, { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'

type Props = {
  children?: ReactNode
}

declare global { interface Window { gtag: any } }

const gaid = process.env.GA_ID

const pageview = (url: string) => {
  window.gtag('config', gaid, {
    page_path: url,
  })
}

type EventProps = {
  action: string
  category: string
  label: string
  value: number
}

const event = ({ action, category, label, value }: EventProps) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

const GA: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaid}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaid}');
        `}
      </Script>
    </>
  )
}

export default GA
