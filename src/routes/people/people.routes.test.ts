import request from 'supertest'

import app from '../../app'
import { Person, PersonDocument } from '../../models/person.model'

describe('People API', () => {
  let john: PersonDocument

  beforeAll(async () => {
    john = new Person({
      username: 'jd007',
      email: 'john.doe@example.com',
      age: 25,
    })
    await john.save()
  })

  it('GET /api/people - success', async () => {
    const { body } = await request(app)
      .get('/api/people')
      .set({ Accept: 'application/json' })

    const { data } = body
    const { people } = data

    expect(people.length).toEqual(1)
    expect(people[0].email).toEqual('john.doe@example.com')
  })

  it('POST /api/people - success', async () => {
    const { status } = await request(app)
      .post('/api/people')
      .send({
        username: 'jane.doe',
        email: 'jane@example.com',
        age: 22,
      })
      .set({ Accept: 'application/json' })

    expect(status).toEqual(201)
  })

  it('PUT /api/people/:id - success', async () => {
    const { status } = await request(app)
      .put(`/api/people/${john._id}`)
      .send({
        username: 'john.doe',
      })
      .set({ Accept: 'application/json' })

    expect(status).toEqual(204)
  })

  it('DELETE /api/people/:id - success', async () => {
    const { status } = await request(app)
      .delete(`/api/people/${john._id}`)
      .set({ Accept: 'application/json' })

    expect(status).toEqual(204)
  })
})
