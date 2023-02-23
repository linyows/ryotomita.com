import fs from 'fs'

export default function GenSitemap() {
  const date = new Date()
  const f = `<xml version="1.0" encoding="UTF-8">
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://ryotomita.com/</loc>
       <lastmod>${date.toISOString()}</lastmod>
     </url>
   </urlset>
   </xml>
`
  fs.writeFileSync('./public/sitemap.xml', f)
}
