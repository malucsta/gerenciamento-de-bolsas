import { Controller, Get, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import ProfessorService from "../../domain/services/professorService";
import Professor from "@src/domain/entities/professor";

@Controller('api/professor')
export default class ProfessorController {

    private professorService = new ProfessorService();


    @Post('')
    public async create(req: Request, res: Response) {
        try {
            const professor: Professor = req.body
            await this.professorService.create(professor)
            return res.status(201).json({message: 'Success'});
        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }

    @Get('')
    public async findOne(req: Request, res: Response) {
        try {
            const { matricula } = req.query
            const result = await this.professorService.findOne(Number(matricula));
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }
}