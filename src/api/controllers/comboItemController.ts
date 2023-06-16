import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { Request, Response } from 'express';
import { ComboItemService } from '@src/application/services/comboItemService';
import { BaseComboItem, isValidComboItem } from '@src/domain/models/comboItem';

@Controller('api/combo-item')
export default class ComboItemController {

    private comboItemsService = new ComboItemService();

    @Get('')
    public async findAll(_: Request, res: Response) {

        try {

            const result = await this.comboItemsService.findAllComboItems();
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }

    @Get(':id')
    public async findOne(req: Request, res: Response) {

        try {

            const result = await this.comboItemsService.findOne(Number(req.params.id));
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }

    @Post('')
    public async create(req: Request, res: Response) {

        const comboItemToCreate: BaseComboItem = {
            idCombo: req.body.idCombo,
            idProduct: req.body.idProduct,
            quantity: req.body.quantity
        };

        try {

            if (!isValidComboItem(comboItemToCreate)) return res.sendStatus(400);
            else {
                const result = await this.comboItemsService.createComboItem(comboItemToCreate);
                return result.sucess ? res.status(201).json(result) : res.status(400).json(result)
            }

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }


    @Put(':id')
    public async update(req: Request, res: Response) {

        const id = Number(req.params.id);

        const comboItemToUpdate: BaseComboItem = {
            idCombo: req.body.idCombo,
            idProduct: req.body.idProduct,
            quantity: req.body.quantity
        };

        try {

            if (!isValidComboItem(comboItemToUpdate)) return res.sendStatus(400);
            else {
                const result = await this.comboItemsService.updateComboItem(id, comboItemToUpdate);
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

            const result = await this.comboItemsService.deleteComboItem(id);
            return result.sucess ? res.status(200).json(result) : res.status(400).json(result)

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }
}