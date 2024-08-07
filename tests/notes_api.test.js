const { test, after} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const api = supertest(app)
const User = require('../controller/users')
const helper= require('./helper')
test('phone entries are returned as json', async () => {
  await api
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two entries ',async ()=>{
    const ans=await api.get('/api/persons')
    assert.strictEqual(ans.body.length,2);
})

test('the first note is about HTTP Methods', async()=>{
    const response = await api.get('/api/persons')

    const contents = response.body.map(e => e.content)
    assert(contents.includes('Ketan'))
})



after(async () => {
  await mongoose.connection.close()
})