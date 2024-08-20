/* eslint-disable no-undef */
import request from 'supertest'
import app from '../main'

describe('GET /images', () => {
  it('should return 400 if missing any params', async (): Promise<void> => {
    const response = await request(app)
      .get('/api/images')
      .query({ image: 'images.jpg' })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'Missing required parameter: width',
    })
  })

  it('should return 400 if missing params', async (): Promise<void> => {
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

  it('should return 200', async (): Promise<void> => {
    const response = await request(app)
      .get('/api/images')
      .query({ width: 200, height: 200, filename: 'fjord.jpg' })

    expect(response.status).toBe(200)
    expect(response.header['content-type']).toBe('image/jpeg')
  })
})
