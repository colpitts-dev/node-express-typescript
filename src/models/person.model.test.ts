import { faker } from '@faker-js/faker'

import { Person, PersonDocument, PersonInput } from './person.model'

const fakePerson = () => ({
  username: faker.internet.userName(),
  email: faker.internet.email().toLowerCase(),
  age: faker.datatype.number({ min: 18, max: 100 }),
})

describe('Person Model', () => {
  let person: PersonDocument, personInput: PersonInput

  beforeAll(async () => {
    personInput = fakePerson()
    person = new Person({ ...personInput })

    await person.save()
  })

  afterAll(async () => {
    await person.deleteOne()
  })

  describe('when given valid input', () => {
    it('creates and reads a new person', async () => {
      const fetchedPerson = await Person.findOne({ _id: person._id })

      expect(fetchedPerson).toBeDefined()
      expect(fetchedPerson?.username).toEqual(personInput.username)
    })

    it('updates an existing person', async () => {
      const personUpdateInput: PersonInput = fakePerson()
      await Person.updateOne({ _id: person._id }, { ...personUpdateInput })
      const fetchedPerson = await Person.findOne({ _id: person._id })
      expect(fetchedPerson).toBeDefined()
      expect(fetchedPerson).toMatchObject(personUpdateInput)
      expect(fetchedPerson).not.toMatchObject(personInput)
    })

    it('deletes an existing person', async () => {
      await Person.deleteOne({ _id: person._id })
      const fetchedPerson = await Person.findOne({ _id: person._id })
      expect(fetchedPerson).toBeNull()
    })
  })

  describe('when validating documents', () => {
    const invalidPerson = new Person({
      username: undefined,
      email: 'invalidatexampledotcom',
      age: 16,
    })
    const validationResult = invalidPerson.validateSync()

    it('requires a valid username', () => {
      const validationError = validationResult?.errors?.username?.message
      expect(validationError).toBe('Username is required.')
    })

    it('requires a valid email address', () => {
      const validationError = validationResult?.errors?.email?.message
      expect(validationError).toBe('Please enter a valid email.')
    })

    it('requires a person to be at least 18 years old', () => {
      const validationError = validationResult?.errors?.age?.message
      expect(validationError).toBe('Must be at least 18 years old.')
    })
  })
})
