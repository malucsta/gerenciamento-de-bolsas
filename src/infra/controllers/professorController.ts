import { Controller, Get, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import ProfessorService from "../../domain/services/professorService";
import Professor from "@src/domain/entities/professor";

@Controller('api/aluno')
export default class ProfessorController {

    private professorService = new ProfessorService();


    @Post('')
    public async create(req: Request, res: Response) {
        try {
            const professor: Professor = req.body
            await this.professorService.create(professor)
            return res.status(201);
        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }

    @Get('')
    public async findAll(req: Request, res: Response) {
        try {
            const professor: Professor = req.body
            const result = await this.professorService.findOne(professor.matricula);
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }
}