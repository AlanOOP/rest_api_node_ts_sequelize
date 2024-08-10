import { Router, Request, Response } from "express";
import { getProduct, getProductById, addProduct, updateProduct, updateProductAvailability, deleteProduct } from "./handlers/productHandler";
// import {Cr}

const router = Router();


/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The product ID
 *                      example: 1
 *                  name: 
 *                      type: string
 *                      description: The product name
 *                      example: Iphone 15
 *                  price:
 *                      type: number
 *                      description: The product price
 *                      example: 15999.90
 *                  availability: 
 *                      type: boolean
 *                      description: The product availability
 *                      example: true
 */


/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return list of products
 *          responses: 
 *              200:
 *                  description: succesful response
 *                  content: 
 *                      aplication/json:
 *                              schema: 
 *                                  type:array:
 *                                  items:
 *                                      $ref: '#/components/schemas/Product'
 */

router.get('/', getProduct)

/** @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product By Id
 *          tags:
 *              - Products
 *          description: Return a product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The Id of the product retrieve
 *              required: true
 *              schema: 
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: Succesful response
 *                  content: 
 *                      aplication/json:
 *                              schema: 
 *                                      $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Error validations
 */
router.get('/:id', getProductById)

/** @swagger
 * /api/products:
 *      post:
 *          summary: Create a new product
 *          tags:
 *              - Products
 *          description: Create a new Product
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: Iphone 15 plus
 *                              price:
 *                                   type: number
 *                                   example: 15999
 *          responses: 
 *              201:
 *                  description: Product Created
 *                  content: 
 *                      aplication/json:
 *                              schema: 
 *                                      $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid input data
 */

router.post('/', addProduct)

/** @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Update a product 
 *          tags:
 *              - Products
 *          description: Return a update product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The Id of the product retrieve
 *              required: true
 *              schema: 
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: Iphone 15 plus
 *                              price:
 *                                   type: number
 *                                   example: 15999
 *                              availability:
 *                                   type: boolean
 *                                   example: true
 *          responses: 
 *              200:
 *                  description: Product Update
 *                  content: 
 *                      aplication/json:
 *                              schema: 
 *                                      $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bad Request - Invalid input data
 */

router.put('/:id', updateProduct)

/** @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update availability product
 *          tags:
 *              - Products
 *          description: Change availability 
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The Id of the product retrieve
 *              required: true
 *              schema: 
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: Succesful response
 *                  content: 
 *                      aplication/json:
 *                              schema: 
 *                                      $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Invalid ID format
 */
router.patch('/:id', updateProductAvailability)

/** @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Delete a product
 *          tags:
 *              - Products
 *          description: Delete a product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The Id of the product retrieve
 *              required: true
 *              schema: 
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: Succesful response
 *                  content: 
 *                      aplication/json:
 *                              schema: 
 *                                  type: object
 *                                  properties:
 *                                       message:
 *                                          type: string
 *                                          example: Product deleted successfully
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Invalid ID format
 */
router.delete('/:id', deleteProduct)

export default router;