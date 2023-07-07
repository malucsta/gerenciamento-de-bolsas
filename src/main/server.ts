import { Server } from '@overnightjs/core';
import cors from 'cors';
import * as http from 'http';
import express from 'express';
import AlunoController from '../infra/controllers/alunoController';
import GrupoBolsaController from '../infra/controllers/grupoBolsaController';
import InstitutoController from '../infra/controllers/institutoController';
import ProcessoSeletivoController from '../infra/controllers/processoSeletivoController';
import ProfessorController from '../infra/controllers/professorController';
import CandidaturaController from '../infra/controllers/candidaturaController';

export class SetupServer extends Server {

    private server?: http.Server;

    constructor(private port = 3000) {
        super();
    }

    public init(): void {
        this.setupExpress();
        this.setupControllers();
    }

    private setupExpress(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors())
        this.app.get('/', (req, res) => {
            res.send('Hello, Express!');
            res.header("Access-Control-Allow-Origin", "*");
        });
    }

    private setupControllers(): void {
        const alunoController = new AlunoController();
        const grupoBolsaController = new GrupoBolsaController()
        const institutoController = new InstitutoController()
        const processoSeletivoController = new ProcessoSeletivoController()
        const professorController = new ProfessorController()
        const candidaturaController = new CandidaturaController()

        this.addControllers(alunoController);
        this.addControllers(grupoBolsaController);
        this.addControllers(institutoController);
        this.addControllers(processoSeletivoController);
        this.addControllers(professorController);
        this.addControllers(candidaturaController)
    }

    public start(): void {
        this.server = this.app.listen(this.port, () => {
            console.info('Server running at: http://localhost:3000/');
        });
    }
}