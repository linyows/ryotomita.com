import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Noto_Sans_JP } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { FetchBlocks, FetchPage, GetPageResponseEx, ListBlockChildrenResponseEx } from 'notionate'
import { Blocks } from 'notionate/dist/components'
import 'notionate/dist/styles/notionate.css'

const noto = Noto_Sans_JP({ weight: ['400', '900'], subsets: ['latin'] })

type Props = {
  page: GetPageResponseEx
  home: ListBlockChildrenResponseEx
  manifesto: ListBlockChildrenResponseEx
  archivement: ListBlockChildrenResponseEx
}

export const getStaticProps: GetStaticProps = async (context) => {
  const page = await FetchPage(process.env.NOTION_HOME_ID as string)
  const home = await FetchBlocks(process.env.NOTION_HOME_ID as string)
  const manifesto = await FetchBlocks(process.env.NOTION_MANIFESTO_ID as string)
  const archivement = await FetchBlocks(process.env.NOTION_ARCHIVEMENT_ID as string)
  return {
    props: {
      page,
      home,
      manifesto,
      archivement,
    }
  }
}

const Home: NextPage<Props> = ({ page, home, manifesto, archivement }) => {
  return (
    <>
      <Head>
        <title>行政書士 冨田 良</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={noto.className}>
        <div className={styles.main}>
          <Image className={styles.portrait} src={page.icon.src} alt="ryo tomita" width={300} height={450} priority />
          <div>
            <div className={styles.header}>
              <h1>
                <span className={styles.nameTitle}>行政書士</span>
                <span className={styles.name}>冨田 良</span>
              </h1>
            </div>
            <div className={styles.body}>
              <Blocks blocks={home} />
            </div>
            <div className={styles.body}>
              <Blocks blocks={manifesto} />
            </div>
          </div>
        </div>

        <figure className={styles.fukuokacity}>
          <Image className={styles.logo} src={page.cover.src} alt="Fukuoka City" fill style={{ objectFit: 'cover', objectPosition: '0 80%' }} />
          <figcaption className={styles.caption}>
            写真提供：福岡市
          </figcaption>
        </figure>

        <div className={styles.archivement}>
          <Blocks blocks={archivement} />
        </div>
      </main>

      <footer className={noto.className}>
        <div className={styles.footer}>
          <span className={styles.copyright}>
            &copy; Ryo Tomita. {` `}
          </span>
          Powered by Next.js, Notionate, Notion, GitHub, Cloudflare and {` `}
          <a href="https://lolipop.jp/" target="_blank" rel="noopener noreferrer">Lolipop</a>.
        </div>
      </footer>
    </>
  )
}

export default Home
