'use strict'

const db = require('../server/db')
const {User, Stock, Transaction} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      name: 'Cody Coderson'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      name: 'Murphy Murphreesboro'
    })
  ])
  console.log(`seeded ${users.length} users`)

  const stocks = await Promise.all([
    Stock.create({
      symbol: 'AAPL',
      shares: 6,
      userId: 1
    }),
    Stock.create({
      symbol: 'STWD',
      shares: 40,
      userId: 1
    }),
    Stock.create({
      symbol: 'NFLX',
      shares: 86,
      userId: 1
    }),
    Stock.create({
      symbol: 'MSFT',
      shares: 10,
      userId: 2
    })
  ])
  console.log(`seeded ${stocks.length} stocks`)

  const transax = await Promise.all([
    Transaction.create({
      symbol: 'AAPL',
      shares: 6,
      price: 3000000,
      userId: 1
    }),
    Transaction.create({
      symbol: 'STWD',
      shares: 40,
      price: 205600,
      userId: 1
    })
  ])
  console.log(`seeded ${transax.length} transactions`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
