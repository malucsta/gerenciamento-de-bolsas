import { Controller, Get, Patch, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import ProcessoSeletivoService from "../../domain/services/processoSeletivoService";
import ProcessoSeletivo from "../../domain/entities/processoSeletivo";
import BolsistaService from "../../domain/services/bolsistaService";

@Controller('api/processo-seletivo')
export default class ProcessoSeletivoController {

    private processoSeletivoService = new ProcessoSeletivoService();
    
    private bolsistaService = new BolsistaService();

    @Post('')
    public async create(req: Request, res: Response) {
        try {
            const processoSeletivo: ProcessoSeletivo = req.body.processoSeletivo
            const matricula: number = req.body.matriculaProfessor

            await this.processoSeletivoService.create(processoSeletivo, matricula);
            return res.status(201).json({ message: 'Success' });

        } catch (error) {
            console.error(error)
            return res.status(500).json({ errorMessage: error });
        }
    }

    @Get('')
    public async findOne(req: Request, res: Response) {
        try {
            const { idprocessoSeletivo } = req.query
            const result = await this.processoSeletivoService.findOne(Number(idprocessoSeletivo));
            return res.status(200).json(result);

        } catch (error) {
            console.error(error)
            return res.status(500).json({ errorMessage: error });
        }
    }

    @Post('admit')
    public async admit(req: Request, res: Response) {
        try {
            const { matriculaAluno, idProcessoSeletivo, idBolsa, matriculaProfessor } = req.body
            await this.bolsistaService.create(matriculaAluno, idProcessoSeletivo, idBolsa, matriculaProfessor)
            return res.status(200).json({ message: 'Success' });
        } catch (error) {
            console.error(error)
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