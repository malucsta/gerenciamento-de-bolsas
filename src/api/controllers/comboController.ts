import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { Request, Response } from 'express';
import { ComboService } from '@src/application/services/comboService';
import { BaseCombo, isValidCombo } from '@src/domain/models/combo';

@Controller('api/combo')
export default class ComboController {

    private comboService = new ComboService();

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

        const comboToCreate: BaseCombo = {
            name: req.body.name,
        };

        try {

            if (!isValidCombo(comboToCreate)) return res.sendStatus(400);
            else {
                const result = await this.comboService.createCombo(comboToCreate);
                return result.sucess ? res.status(201).json(result) : res.status(400).json(result)
            }

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }


    @Put(':id')
    public async update(req: Request, res: Response) {

        const id = Number(req.params.id);

        const comboToUpdate: BaseCombo = {
            name: req.body.name,
        };

        try {

            if (!isValidCombo(comboToUpdate)) return res.sendStatus(400);
            else {
                const result = await this.comboService.updateCombo(id, comboToUpdate);
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

            const result = await this.comboService.deleteCombo(id);
            return result.sucess ? res.status(200).json(result) : res.status(400).json(result)

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }
}