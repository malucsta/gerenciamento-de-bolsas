import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { Request, Response } from 'express';
import { BaseProduct, isValidProduct } from '@src/domain/models/product';
import { ProductService } from '@src/application/services/productService';

@Controller('api/product')
export default class ProductController {

    private comboService = new ProductService();

    @Get('')
    public async findAll(_: Request, res: Response) {

        try {

            const result = await this.comboService.findAllProducts();
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }

    @Get(':id')
    public async findOne(req: Request, res: Response) {

        try {

            const result = await this.comboService.findOne(Number(req.params.id));
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }

    @Post('')
    public async create(req: Request, res: Response) {

        const productToCreate: BaseProduct = {
            name: req.body.name,
            price: req.body.price,
        };

        try {

            if (!isValidProduct(productToCreate)) return res.sendStatus(400);
            else {
                const result = await this.comboService.createProduct(productToCreate);
                return result.sucess ? res.status(201).json(result) : res.status(400).json(result);
            }

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }


    @Put(':id')
    public async update(req: Request, res: Response) {

        const id = Number(req.params.id);

        const productToUpdate: BaseProduct = {
            name: req.body.name,
            price: req.body.price,
        };

        try {

            if (!isValidProduct(productToUpdate)) return res.sendStatus(400);
            else {
                const result = await this.comboService.updateProduct(id, productToUpdate);
                return result.sucess ? res.status(200).json(result) : res.status(400).json(result)
            }

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }

    @Delete(':id')
    public async delete(req: Request, res: Response) {

        const id = Number(req.params.id);

        try {

            const result = await this.comboService.deleteProduct(id);
            return result.sucess ? res.status(200).json(result) : res.status(400).json(result)

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }
}