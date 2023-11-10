import request from 'supertest'
require("dotenv").config();
const BASE_URL = process.env.BASE_URL
describe("auth test", () => {
  describe("register tests", () =>{
    test("no username and password", async () => {
      const response = await request(BASE_URL).post('/api/register').send()
      expect(response.statusCode).toBe(400)
    })
    test("username and password supplied", async () => {
      const response = await request(BASE_URL).post('/api/register').send({
        username: "frimps", 
        password: "frimps@2020T"
      })
      expect(response.statusCode).toBe(201)
    })
    test("strong password not supplied", async () => {
      const response = await request(BASE_URL).post('/api/register').send({
        username: "frimps2", 
        password: "test"
      })
      expect(response.statusCode).toBe(400)
    })
    test("conflicting usernames", async () => {
      const response = await request(BASE_URL).post('/api/register').send({
        username: "frimps", 
        password: "frimps@2020T"
      })
      expect(response.statusCode).toBe(409)
    })
  })
});
