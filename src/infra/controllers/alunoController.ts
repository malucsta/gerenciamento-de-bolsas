import { Controller, Get, Post } from "@overnightjs/core";
import AlunoService from "../../domain/services/alunoService";
import { Request, Response } from "express";
import InstitutoService from "../../domain/services/institutoService";
import Aluno from "@src/domain/entities/aluno";

@Controller('api/aluno')
export default class AlunoController {

    private alunoService = new AlunoService();
    private institutoService = new InstitutoService()


    @Post('')
    public async create(req: Request, res: Response) {
        try {
            const aluno: Aluno = req.body
            const instituto = await this.institutoService.findOne(aluno.idInstituto)

            if(instituto.length < 1) {
                throw new Error('Bad request!')
            }

            await this.alunoService.create(aluno)
            return res.status(201);
        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }

    @Get('')
    public async findAll(req: Request, res: Response) {
        try {
            const result = await this.alunoService.getAll();
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }
}