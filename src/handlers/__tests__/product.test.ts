import request from "supertest";
import server from "../../server";

describe('POST /api/products', () => {
    it('Should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');

        expect(response.status).not.toBe(201);

    })
    it('Should validate that the price is a number and great than zero', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Mouse - Testing",
            price: 0
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');

        expect(response.status).not.toBe(201);

    })
    it('Should be create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Mouse - Testing",
            price: 15900
        })

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
    })
})

describe('GET /api/products', () => {
    it('get products ', async () => {
        const reponse = await request(server).get('/api/products')

        expect(reponse.status).toBe(200);
        expect(reponse.headers['content-type']).toMatch(/json/);
        expect(reponse.body).not.toBe('error');
        expect(reponse.status).not.toBe(404);

    })
})

describe('GET /api/products/:id', () => {
    it('Should return a 404 response for a non-existen product', async () => {
        const productId = 2039;
        const response = await request(server).get(`/api/products/${productId}`);

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Product not found')
    })
    it('Should check a validate id in the URL', async () => {
        const response = await request(server).get('/api/products/not-validate-url');
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Invalid ID format')
    })
    it('GET a JSON response for a single product', async () => {
        const response = await request(server).get('/api/products/1');
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('name')

    })
})

describe('PUT /api/products', () => {
    it('Should return a 404 response for a non-existen product', async () => {
        const productId = 2039;
        const response = await request(server).put(`/api/products/${productId}`);

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Product not found')
    })
    it('should display validation error message when updating product', async () => {
        const response = await request(server).put('/api/products/1').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
    })
    it('should validate that the price is greather than 0', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: "Mouse - Testing",
            price: 0,
            availability: true
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');

        expect(response.status).not.toBe(201);
    })
    it('Should be  update product', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: "Mouse - Testing",
            price: 15900,
            availability: false
        })

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
    })

})
describe('PATCH /api/products', () => {
    it('Should check a validate id in the URL', async () => {
        const response = await request(server).patch('/api/products/not-validate-url');
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Invalid ID format')
    })
    it('Should return a 404 response for a non-existen product', async () => {
        const productId = 2039;
        const response = await request(server).patch(`/api/products/${productId}`);

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Product not found')
    })
    it('Should be update product availability', async () => {
        const response = await request(server).patch('/api/products/1')

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
    })

})

describe('DELETE /api/products', () => {
    it('Should check a validate id in the URL', async () => {
        const response = await request(server).delete('/api/products/not-validate-url');
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Invalid ID format')
    })
    it('Should check a valid ID', async () => {

        const productId = 2039;
        const response = await request(server).delete(`/api/products/${productId}`);

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Product not found')

    })
    it('Should be eliminate product', async () => {
        const response = await request(server).delete('/api/products/1')

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
    })
})


