import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";
import CandidaturaService from "../../domain/services/candidaturaService";


@Controller('api/candidatura')
export default class CandidaturaController {

    private candidaturaService = new CandidaturaService();

    @Get('')
    public async findAll(req: Request, res: Response) {
        try {
            const result = await this.candidaturaService.getAll();
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }

    @Get('processo-seletivo/:id')
    public async findByProcessoSeletivo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await this.candidaturaService.findByProcessoSeletivo(Number(id));
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }
}