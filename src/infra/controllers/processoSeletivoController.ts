import { Controller, Get, Patch, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import ProcessoSeletivoService from "@src/domain/services/processoSeletivoService";
import ProcessoSeletivo from "@src/domain/entities/processoSeletivo";
import ProfessorService from "@src/domain/services/professorService";

@Controller('api/processoSeletivo')
export default class ProcessoSeletivoController {

    private processoSeletivoService = new ProcessoSeletivoService();
    private professorService = new ProfessorService()

    @Post('')
    public async create(req: Request, res: Response) {
        try {
            const processoSeletivo: ProcessoSeletivo = req.body.processoSeletivo
            const matricula: number = req.body.matricula
            await this.processoSeletivoService.create(processoSeletivo);
            await this.professorService.setAdmin(matricula, processoSeletivo.id)
            
            return res.status(201);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }

    @Get('')
    public async findOne(req: Request, res: Response) {
        try {
            const processoSeletivo: ProcessoSeletivo = req.body
            const result = await this.processoSeletivoService.findOne(processoSeletivo.id);
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }

    @Patch('')
    public async desactivate(req: Request, res: Response) {
        try {
            const processoSeletivo: ProcessoSeletivo = req.body
            const result = await this.processoSeletivoService.desactivate(processoSeletivo.id);
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }
}