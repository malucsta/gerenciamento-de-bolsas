import { Server } from '@overnightjs/core';
import * as http from 'http';
import express from 'express';
import AlunoController from './api/controllers/alunoController';

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

        this.app.get('/', (req, res) => {
            res.send('Hello, Express!');
        });
    }

    private setupControllers(): void {
        const alunoController = new AlunoController();

        this.addControllers(alunoController);
    }

    public start(): void {
        this.server = this.app.listen(this.port, () => {
            console.log('Server running at: http://localhost:3000/');
        });
    }
}