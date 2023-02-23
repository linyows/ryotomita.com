import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { FetchBlocks, FetchPage, FetchDatabase, GetPageResponseEx, ListBlockChildrenResponseEx, PageObjectResponse, QueryDatabaseResponseEx } from 'notionate'
import { Blocks, Gallery, Table } from 'notionate/dist/components'
import 'notionate/dist/styles/notionate.css'

type TitleAndBlocks = {
  title: string
  page: GetPageResponseEx
  blocks: ListBlockChildrenResponseEx 
}

type Evaluation = {
  name: string
  unit: string
  number: number
}

type DB = {
  title: string
  desc: string
  db: QueryDatabaseResponseEx
}

type Props = {
  message: TitleAndBlocks
  manifesto: TitleAndBlocks
  archivement: TitleAndBlocks
  profile: TitleAndBlocks
  vision: TitleAndBlocks
  collaboration: Evaluation
  reward: Evaluation
  gallery: DB
  //recommenders: DB
}

const messageid = process.env.NOTION_HOME_ID as string
const manifestoid = process.env.NOTION_MANIFESTO_ID as string
const archivementid = process.env.NOTION_ARCHIVEMENT_ID as string
const profileid = process.env.NOTION_PROFILE_ID as string
const evaluationid = process.env.NOTION_EVALUATION_ID as string
const visionid = process.env.NOTION_VISION_ID as string
const galleryid = process.env.NOTION_GALLERY_ID as string
/*
const recommenderid = process.env.NOTION_RECOMMENDER_ID as string
const recommenderName = '推薦者'
const recommenderAffiliation = '所属支部'
*/

const buildTitleAndBlocks = async (id: string): Promise<TitleAndBlocks> => {
  const page = await FetchPage(id)
  // @ts-ignore
  const title = page.properties.title.title[0].plain_text
  const blocks = await FetchBlocks(id)
  return {
    title,
    page,
    blocks,
  }
}

const getEvaluation = async (slug: string): Promise<Evaluation> => {
  const { results } = await FetchDatabase({ database_id: evaluationid })
  const props = results.find(v => {
    // @ts-ignore
    return v.properties.Slug.select.name === slug
  }) as PageObjectResponse
  return {
    // @ts-ignore
    name: props.properties.Name.title[0].plain_text,
    // @ts-ignore
    unit: props.properties.Unit.rich_text[0].plain_text,
    // @ts-ignore
    number: props.properties.Number.number,
  }
}

/*
const getRecommenders = async (): Promise<DB> => {
  const db = await FetchDatabase({
    database_id: recommenderid,
    sorts: [
      {
        property: recommenderAffiliation,
        direction: 'ascending',
      },
      {
        property: recommenderName,
        direction: 'ascending',
      },
    ],
  })
  // @ts-ignore
  const title = db.meta.title[0].plain_text
  // @ts-ignore
  const desc = db.meta.description[0].plain_text
  return {
    title,
    desc,
    db,
  }
}
*/

const getGallery = async (): Promise<DB> => {
  const db = await FetchDatabase({
    database_id: galleryid,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true
      },
    },
    sorts: [
      {
        property: 'Sort',
        direction: 'ascending',
      },
    ],
  })
  // @ts-ignore
  const title = db.meta.title[0].plain_text
  // @ts-ignore
  const desc = db.meta.description[0].plain_text
  return {
    title,
    desc,
    db,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      message: await buildTitleAndBlocks(messageid),
      manifesto: await buildTitleAndBlocks(manifestoid),
      archivement: await buildTitleAndBlocks(archivementid),
      profile: await buildTitleAndBlocks(profileid),
      vision: await buildTitleAndBlocks(visionid),
      collaboration: await getEvaluation('collaboration'),
      reward: await getEvaluation('reward'),
      gallery: await getGallery(),
      //recommenders: await getRecommenders(),
    }
  }
}

const Home: NextPage<Props> = ({ message, manifesto, archivement, profile, vision, collaboration, reward, gallery }) => {
  return (
    <>
      <Head>
        <title>行政書士 冨田 良</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.band}>
        <p className={styles.bandDesc}>令和5年福岡県行政書士会 会長選挙</p>
        <p className={styles.bandTitle}>立候補所信</p>
      </div>

      <main>
        <div className={styles.header}>
          <div>
            <Image className={styles.portrait} src={message.page.icon.src} alt="ryo tomita" width={300} height={450} priority />
          </div>
          <div>
            <div className={styles.title}>
              <h1 className={styles.sitename}>
                <span className={styles.nameTitle}>行政書士</span>
                <span className={styles.name}>冨田 良</span>
                <span className={styles.nameYomi}>とみた りょう</span>
              </h1>
            </div>
            <div className={styles.body}>
              <Blocks blocks={message.blocks} />
            </div>
          </div>
        </div>

        <div className={styles.box}>
          <section className={styles.evaluation}>
            <div>
              <h3>{collaboration.name}</h3>
              <p><span className={styles.evaluationunit}>{collaboration.number}</span>{collaboration.unit}</p>
            </div>
            <div>
              <h3>{reward.name}</h3>
              <p><span className={styles.evaluationunit}>{reward.number}</span>{reward.unit}</p>
            </div>
          </section>
        </div>

        <div className={styles.box}>
          <section className={styles.vision}>
            <h1>{vision.title}</h1>
            <Blocks blocks={vision.blocks} />
          </section>
        </div>

        <div className={styles.box}>
          <section className={styles.manifesto}>
            <h1>{manifesto.title}</h1>
            <Blocks blocks={manifesto.blocks} />
          </section>
        </div>

        <figure className={styles.fukuokacity}>
          <Image className={styles.logo} src={message.page.cover.src} alt="Fukuoka City" fill style={{ objectFit: 'cover', objectPosition: '0 80%' }} />
          <figcaption className={styles.caption}>
            写真提供：福岡市
          </figcaption>
        </figure>

        <div className={styles.box}>
          <section className={`${styles.archivement} notionate-override-half-image`}>
            <h1>{archivement.title}</h1>
            <Blocks blocks={archivement.blocks} />
          </section>
        </div>
{/*
        <div className={styles.box}>
          <section className={`${styles.gallery}`}>
            <h1>{recommenders.title}</h1>
            <p className={styles.recommendersDesc}>{recommenders.desc}</p>
            <Table keys={[recommenderName, recommenderAffiliation]} db={recommenders.db} />
          </section>
        </div>
*/}
        <div className={styles.box}>
          <section className={`${styles.gallery}`}>
            <h1>{gallery.title}</h1>
            <p className={styles.galleryDesc}>{gallery.desc}</p>
            <Gallery keys={['Name']} db={gallery.db} preview="cover" size="large" fit={false} />
          </section>
        </div>
      </main>

      <div className={styles.profileBox}>
        <section className={`${styles.profile} notionate-override-profile`}>
          <h1>{profile.title}</h1>
          <Blocks blocks={profile.blocks} />
        </section>
      </div>

      <footer className={styles.footer}>
          <span className={styles.copyright}>
            &copy; Ryo Tomita. {` `}
          </span>
          Powered by Next.js, Notionate, Notion, GitHub, Cloudflare and {` `}
          <a href="https://lolipop.jp/" target="_blank" rel="noopener noreferrer">Lolipop</a>.
      </footer>
    </>
  )
}

export default Home
