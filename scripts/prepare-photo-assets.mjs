import { mkdir, writeFile } from 'node:fs/promises'

const photoAssets = {
  'public/people/emma.svg': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&h=800&q=90',
  'public/people/sofia.svg': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&h=800&q=90',
  'public/people/lucas.svg': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&h=800&q=90',
  'public/people/mei.svg': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&h=800&q=90',
  'public/events/event-1.svg': 'https://images.unsplash.com/photo-1774301582912-29fbd0a4f1cd?auto=format&fit=crop&w=1200&h=800&q=88',
  'public/events/event-2.svg': 'https://images.unsplash.com/photo-1526112455121-272736767b9e?auto=format&fit=crop&w=1200&h=800&q=88',
  'public/events/event-3.svg': 'https://images.unsplash.com/photo-1644413405683-ffc59956cac1?auto=format&fit=crop&w=1200&h=800&q=88',
}

await Promise.all([mkdir('public/people', { recursive: true }), mkdir('public/events', { recursive: true })])

for (const [path, url] of Object.entries(photoAssets)) {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'furusato-match-build/1.0' },
    })
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)

    const bytes = Buffer.from(await response.arrayBuffer())
    const mime = response.headers.get('content-type')?.split(';')[0] || 'image/jpeg'
    const encoded = bytes.toString('base64')
    const isAvatar = path.includes('/people/')
    const width = isAvatar ? 800 : 1200
    const height = isAvatar ? 800 : 800
    const radius = isAvatar ? 80 : 40
    const label = path.split('/').pop()?.replace('.svg', '') || 'photo'

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">\n  <defs><clipPath id="clip"><rect width="${width}" height="${height}" rx="${radius}" ry="${radius}"/></clipPath></defs>\n  <image href="data:${mime};base64,${encoded}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice" clip-path="url(#clip)"/>\n</svg>\n`

    await writeFile(path, svg, 'utf8')
    console.log(`Prepared photo asset: ${path}`)
  } catch (error) {
    console.warn(`Could not refresh ${path}; keeping repository fallback.`, error)
  }
}
