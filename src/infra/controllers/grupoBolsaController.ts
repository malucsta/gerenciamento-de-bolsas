import { Controller, Get, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import GrupoBolsa from "@src/domain/entities/grupoBolsa";
import GrupoBolsaService from "@src/domain/services/grupoBolsaService";
import ProfessorService from "@src/domain/services/professorService";

@Controller('api/grupoBolsa')
export default class GrupoBolsaController {

    private grupoBolsaService = new GrupoBolsaService();
    private professorService = new ProfessorService()

    @Post('')
    public async create(req: Request, res: Response) {
        try {
            const grupoBolsa: GrupoBolsa = req.body.grupoBolsa
            const { matriculaProfessor } = req.body

            // No nível de BD, grupo bolsa tem cardinalidade 0,n com orientador
            // Porém a nível de API, decidimos vincular o professor que está criando o grupo bolsa de forma padrão
            // Dessa forma garantimos a consistência e deixamos nosso BD flexível para novas implementações 
            await this.grupoBolsaService.create(grupoBolsa);
            await this.professorService.setOrientador(matriculaProfessor, grupoBolsa.id)
            return res.status(201);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }

    @Get('')
    public async findAll(req: Request, res: Response) {
        try {
            const result = await this.grupoBolsaService.getAll();
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    }
}