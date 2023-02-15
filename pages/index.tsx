import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Noto_Sans_JP } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { FetchBlocks, FetchPage, GetPageResponseEx, ListBlockChildrenResponseEx } from 'notionate'
import { Blocks } from 'notionate/dist/components'

const noto = Noto_Sans_JP({ weight: ['400', '900'], subsets: ['latin'] })
type Props = {
  page: GetPageResponseEx
  blocks: ListBlockChildrenResponseEx
}

export const getStaticProps: GetStaticProps = async (context) => {
  const page = await FetchPage(process.env.NOTION_HOMEID as string)
  const blocks = await FetchBlocks(process.env.NOTION_HOMEID as string)
  return {
    props: {
      page,
      blocks,
    }
  }
}

const Home: NextPage<Props> = ({ page, blocks }) => {
  return (
    <>
      <Head>
        <title>行政書士 冨田 良</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1 className={noto.className}>行政書士 冨田 良</h1>
          <Image className={styles.logo} src={page.icon.src} alt="ryo tomita" width={130} height={173} priority />
          <Blocks blocks={blocks} />
        </div>
      </main>
    </>
  )
}

export default Home
