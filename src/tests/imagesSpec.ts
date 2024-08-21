/* eslint-disable no-undef */
import request from 'supertest'
import fs from 'fs'
import path from 'path'
import app from '../main'
import { getCachedImg, getImageBuffer } from '../routes/api/images'

describe('GET /_healthcheck', () => {
  it('should return 200', async (): Promise<void> => {
    const response = await request(app).get('/_healthcheck')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      product: 'image-processing-api',
      env: 'dev',
    })
  })
})

describe('util functions', () => {
  it('getCachedImg() should return correct path', () => {
    const filename = 'fjord.jpg'
    const width = 200
    const height = 200
    const thumbFileName = `${path.basename(
      filename,
      path.extname(filename)
    )}_${width}_${height}.jpg`
    const thumbPath = `${process.cwd()}/assets/thumb/${thumbFileName}`
    expect(getCachedImg(filename, width, height)).toBe(thumbPath)
  })

  it('getImageBuffer() should return buffer', async (): Promise<void> => {
    const filename = 'fjord.jpg'
    const imageBuffer = await getImageBuffer(filename)
    expect(Buffer.isBuffer(imageBuffer)).toBe(true)
  })
})

describe('GET /images', () => {
  it('should return 400 if missing width and heigh params', async (): Promise<void> => {
    const response = await request(app)
      .get('/api/images')
      .query({ image: 'images.jpg' })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'Missing required parameter: width',
    })
  })

  it('should return 400 if width parameter is invalid', async (): Promise<void> => {
    const response = await request(app)
      .get('/api/images')
      .query({ width: 'invalid', height: 200, filename: 'fjord.jpg' })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'Invalid parameter: width must be a number',
    })
  })

  it('should return 400 if height parameter is invalid', async (): Promise<void> => {
    const response = await request(app)
      .get('/api/images')
      .query({ width: 200, height: 'invalid', filename: 'fjord.jpg' })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'Invalid parameter: height must be a number',
    })
  })

  it('should return 400 if missing filename params', async (): Promise<void> => {
    const response = await request(app)
      .get('/api/images')
      .query({ width: 200, height: 200 })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'Missing required parameter: filename',
    })
  })

  it('should return 400 if filename is not found', async (): Promise<void> => {
    const response = await request(app)
      .get('/api/images')
      .query({ width: 200, height: 200, filename: 'notfound.jpg' })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'Invalid parameter: filename does not exist',
    })
  })

  it('should return 200 with new image', async (): Promise<void> => {
    const filename = 'fjord.jpg'
    const width = 200
    const height = 200
    const thumbFileName = `${path.basename(
      filename,
      path.extname(filename)
    )}_${width}_${height}.jpg`
    // check filename is exist in thumb folder or not
    const thumbPath = `${process.cwd()}/assets/thumb/${thumbFileName}`
    if (fs.existsSync(thumbPath)) {
      // remove cached file if exist
      fs.unlinkSync(thumbPath)
    }
    const response = await request(app)
      .get('/api/images')
      .query({ width, height, filename })

    expect(response.status).toBe(200)
    expect(response.header['content-type']).toBe('image/jpg')
    // expect file is exist in thumb folder
    expect(fs.existsSync(thumbPath)).toBe(true)
  })
})
