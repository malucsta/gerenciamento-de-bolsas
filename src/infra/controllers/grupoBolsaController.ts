import { Controller, Get, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import GrupoBolsa from "@src/domain/entities/grupoBolsa";
import GrupoBolsaService from "@src/domain/services/grupoBolsaService";

@Controller('api/grupoBolsa')
export default class GrupoBolsaController {

    private service = new GrupoBolsaService();

    @Post('')
    public async create(req: Request, res: Response) {
        try {
            const grupoBolsa: GrupoBolsa = req.body
            await this.service.create(grupoBolsa);
            return res.status(201);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }

    @Get('')
    public async findAll(req: Request, res: Response) {
        try {
            const result = await this.service.getAll();
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }
}