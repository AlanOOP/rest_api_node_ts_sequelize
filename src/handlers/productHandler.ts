import { Request, Response } from "express"
import Product from "../models/Products"


export const getProduct = async (req: Request, res: Response) => {
    try {
        const products: Product[] = await Product.findAll({
            order: [
                ['price', 'DESC']
            ],
            // attributes: {
            //     // exclude: ['createdAt']
            // }
        });
        res.json(products)
    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        if (isNaN(Number(id))) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        return res.json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while fetching the product" });
    }
}


export const addProduct = async (req: Request, res: Response): Promise<Response> => {
    const { name, price }: Product = req.body;

    try {

        // Validaciones manuales
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: "Name is required and must be a string" });
        }

        if (!price || typeof price !== 'number' || price <= 0) {
            return res.status(400).json({ error: "Price is required and must be a positive number" });
        }

        const product = new Product(req.body);
        const savedProduct = await product.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        console.log(error);
    }
}


export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    const { name, price, availability }: Product = req.body;


    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: "Name must be a string" });
        }

        if (!price || price <= 0) {
            return res.status(400).json({ error: "Price must be a positive number" });
        }

        if (typeof availability !== 'boolean') {
            return res.status(400).json({ error: "Availability must be a boolean" });
        }

        product.name = name
        product.price = price
        product.availability = availability
        await product.save();

        return res.json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while updating the product" });
    }
};

export const updateProductAvailability = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const product = await Product.findByPk(Number(id));

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        product.availability = !product.dataValues.availability;

        await product.save()

        return res.json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while updating the product availability" });
    }
};


export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        await product.destroy();

        return res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while deleting the product" });
    }
};