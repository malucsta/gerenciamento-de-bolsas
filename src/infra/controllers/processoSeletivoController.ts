import { Controller, Get, Patch, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import ProcessoSeletivoService from "@src/domain/services/processoSeletivoService";
import ProcessoSeletivo from "@src/domain/entities/processoSeletivo";

@Controller('api/processoSeletivo')
export default class ProcessoSeletivoController {

    private service = new ProcessoSeletivoService();

    @Post('')
    public async create(req: Request, res: Response) {
        try {
            const processoSeletivo: ProcessoSeletivo = req.body
            await this.service.create(processoSeletivo);
            return res.status(201);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }

    @Get('')
    public async findOne(req: Request, res: Response) {
        try {
            const processoSeletivo: ProcessoSeletivo = req.body
            const result = await this.service.findOne(processoSeletivo.id);
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }

    @Patch('')
    public async desactivate(req: Request, res: Response) {
        try {
            const processoSeletivo: ProcessoSeletivo = req.body
            const result = await this.service.desactivate(processoSeletivo.id);
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }
}