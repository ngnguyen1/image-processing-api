import express, { Router, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

// Create a new router instance
const router: Router = express.Router()

export function getCachedImg(
  filename: string,
  width: number,
  height: number
): string {
  const fileWithoutExtension = path.basename(filename, path.extname(filename))
  return `${process.cwd()}/assets/thumb/${fileWithoutExtension}_${width}_${height}.jpg`
}

export async function getImageBuffer(filename: string): Promise<Buffer> {
  const image = sharp(`${process.cwd()}/assets/full/${filename}`)
  return await image.toBuffer()
}

// Define your routes
router.get('/', async (req: Request, res: Response) => {
  const { filename } = req.query
  const width = parseInt(req.query.width as string, 10)
  const height = parseInt(req.query.height as string, 10)

  const cachedImg = getCachedImg(filename as string, width, height)

  // Check if the cached image file exists
  if (fs.existsSync(cachedImg)) {
    // Handle the case when the cached image file does not exist
    res.set('Content-Type', 'image/jpg')
    return res.sendFile(cachedImg)
  }

  const imageBuffer = await getImageBuffer(filename as string)
  const resizedImage = await sharp(imageBuffer).resize(width, height).toBuffer()

  fs.writeFileSync(cachedImg, resizedImage)

  res.set('Content-Type', 'image/jpg')
  res.send(resizedImage)
})

// Export the router
export default router
