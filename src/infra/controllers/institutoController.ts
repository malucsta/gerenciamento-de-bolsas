import { Controller, Post } from "@overnightjs/core";
import InstitutoService from "../../domain/services/institutoService";
import { Request, Response } from "express";

@Controller('api/instituto')
export default class InstitutoController {

    private service = new InstitutoService();

    @Post('')
    public async create(req: Request, res: Response) {
        try {
            const { body: { name } } = req
            await this.service.create(name);
            return res.status(201);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }
}