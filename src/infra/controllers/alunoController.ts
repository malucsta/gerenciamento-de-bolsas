import { Controller, Get } from "@overnightjs/core";
import AlunoService from "../../domain/services/alunoService";
import { Request, Response } from "express";

@Controller('api/aluno')
export default class AlunoController {

    private service = new AlunoService();

    @Get('')
    public async findAll(_: Request, res: Response) {
        try {
            const result = await this.service.GetAll();
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }
}