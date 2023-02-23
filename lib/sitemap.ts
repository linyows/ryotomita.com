import fs from 'fs'

// https://www.w3.org/TR/NOTE-datetime
function buildW3CDateFormat(d: Date) {
  const YYYY = d.getUTCFullYear()
  const MM = ('0' + (d.getUTCMonth() + 1)).slice(-2)
  const DD = ('0' + d.getUTCDate()).slice(-2)
  const hh = ('0' + d.getUTCHours()).slice(-2)
  const mm = ('0' + d.getUTCMinutes()).slice(-2)
  const ss = ('0' + d.getUTCSeconds()).slice(-2)
  return `${YYYY}-${MM}-${DD}T${hh}:${mm}:${ss}+00:00`
}

export default function GenSitemap() {
  const date = new Date()
  const f = `<xml version="1.0" encoding="UTF-8">
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://ryotomita.com/</loc>
       <lastmod>${buildW3CDateFormat(date)}</lastmod>
     </url>
   </urlset>
   </xml>
`
  fs.writeFileSync('./public/sitemap.xml', f)
}
