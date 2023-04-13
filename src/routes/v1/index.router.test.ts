import request from 'supertest'

import app from '../../app'

describe('API health check', () => {
  it('GET /api/v1 - success', async () => {
    const { body } = await request(app)
      .get('/api/v1')
      .set({ Accept: 'application/json' })

    expect(body).toEqual({
      title: 'hyper[local]',
      content: 'community engagement platform',
    })
  })
})
