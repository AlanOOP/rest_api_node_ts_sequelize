import request from 'supertest'
import server from '../server'

describe('GET /', () => {
    it('should send a json response', async () => {
        const response = await request(server).get('/');

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toBe('Hola Mundo')

        expect(response.status).not.toBe(404)
    })
})