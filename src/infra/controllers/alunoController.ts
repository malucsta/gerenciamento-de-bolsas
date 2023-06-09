import { Controller, Get, Post } from "@overnightjs/core";
import AlunoService from "../../domain/services/alunoService";
import { Request, Response } from "express";
import Aluno from "@src/domain/entities/aluno";

@Controller('api/aluno')
export default class AlunoController {

    private alunoService = new AlunoService();

    @Post('')
    public async create(req: Request, res: Response) {
        try {
            const aluno: Aluno = req.body
            await this.alunoService.create(aluno)
            return res.status(201).json({ message: 'Success' });
        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }

    @Post('candidatura')
    public async apply(req: Request, res: Response){
        try {
            const {matricula, idProcessoSeletivo} = req.body
            await this.alunoService.apply(matricula, idProcessoSeletivo)
            
            return res.status(201).json({ message: 'Success' });
        } catch (error) {
            console.error(error)
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

    @Get(':matricula')
    public async findOne(req: Request, res: Response) {
        try {
            const matricula = Number(req.params.matricula)
            const result = await this.alunoService.findOne(matricula);
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }
}