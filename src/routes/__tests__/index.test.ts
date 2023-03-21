import express from 'express'
import request from 'supertest'

import rootRouter from '../index.router'

const app = express()
app.use('/api', rootRouter)

describe('API health check', () => {
  it('GET /api - success', async () => {
    const { body } = await request(app)
      .get('/api')
      .set({ Accept: 'application/json' })

    expect(body).toEqual({
      title: 'hyper[local]',
      content: 'community engagement platform',
    })
  })
})
