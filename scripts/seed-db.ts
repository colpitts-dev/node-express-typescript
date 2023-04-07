import mongoose, { connect } from 'mongoose'
import dotenv from 'dotenv'

import { Person } from '../src/models/person.model'

dotenv.config()

const peopleData = [
  {
    username: 'admin',
    email: 'admin@example.com',
    age: 21,
  },
]

async function run() {
  const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/dev'
  mongoose.set('strictQuery', false)

  const conn = await connect(dbUri)

  // Drop all existing data
  await conn.connection.db.dropDatabase()

  // Seed people
  const people = await Person.collection.insertMany(peopleData)
  console.log(people)

  await mongoose.connection.close()
  console.log('\n')
  console.log('🌱 Database seeded with app data')
  console.log('👋 Please start the app using `yarn dev`\n')
  process.exit(0)
}

run().catch(err => console.log(err))
