import imagemin from 'imagemin'
import imageminJpegtran from 'imagemin-jpegtran'

export async function getBase64ImageUrl(x, y, imageUrl, width = 100) {
  const response = await fetch(imageUrl.startsWith('http:') ? imageUrl : `https://opt.moovweb.net/?img=${imageUrl}&width=${width}`)
  const buffer = await response.arrayBuffer()
  const minified = await imagemin.buffer(Buffer.from(buffer), {
    plugins: [imageminJpegtran({ progressive: true })],
  })
  const base64 = Buffer.from(minified).toString('base64')
  return {
    x,
    y,
    data: `data:image/jpeg;base64,${base64}`,
  }
}
