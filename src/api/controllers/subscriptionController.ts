import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { Request, Response } from 'express';
import { SubscriptionService } from '@src/application/services/subscriptionService';
import { BaseSubscription, isValidSubscription } from '@src/domain/models/subscription';
@Controller('api/subscription')
export default class SubscriptionController {

    private repository = new SubscriptionService();

    @Get('')
    public async findAll(_: Request, res: Response) {

        try {

            const result = await this.repository.findAllSubscriptions();
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }

    }


    @Get(':id')
    public async findOne(req: Request, res: Response) {

        try {

            const result = await this.repository.findOne(Number(req.params.id));
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }

    }

    @Get('details/:id')
    public async getDetails(req: Request, res: Response) {

        try {
            const result = await this.repository.getDetails(Number(req.params.id));
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }

    @Post('')
    public async create(req: Request, res: Response) {

        const subscriptionToCreate: BaseSubscription = {
            name: req.body.name,
            idCombo: req.body.idCombo,
        };


        try {

            if (!isValidSubscription(subscriptionToCreate)) return res.sendStatus(400);
            else {
                const result = await this.repository.createSubscription(subscriptionToCreate);
                return result.sucess ? res.status(201).json(result) : res.status(400).json(result);
            }

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }


    @Put(':id')
    public async update(req: Request, res: Response) {

        const id = Number(req.params.id);

        const subscriptionToUpdate: BaseSubscription = {
            name: req.body.name,
            idCombo: req.body.idCombo,
        };


        try {

            if (!isValidSubscription(subscriptionToUpdate)) return res.sendStatus(400);
            else {
                const result = await this.repository.updateSubscription(id, subscriptionToUpdate);
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

            const result = await this.repository.deleteSubscription(id);
            return result.sucess ? res.status(200).json(result) : res.status(400).json(result)

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }

    }
}