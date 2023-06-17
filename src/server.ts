import './util/module-alias';
import { Server } from '@overnightjs/core';
import * as http from 'http';
import express from 'express';
import ProductController from '@src/api/controllers/productController';
import ComboController from '@src/api/controllers/comboController';
import ComboItemController from '@src/api/controllers/comboItemController';
import SubscriptionController from '@src/api/controllers/subscriptionController';
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
    }

    private setupControllers(): void {
        const productController = new ProductController();
        const comboController = new ComboController();
        const comboItemController = new ComboItemController();
        const subscriptionController = new SubscriptionController();

        const alunoController = new AlunoController();

        this.addControllers(productController);
        this.addControllers(comboController);
        this.addControllers(comboItemController);
        this.addControllers(subscriptionController);
        this.addControllers(alunoController);
    }

    public start(): void {
        this.server = this.app.listen(this.port, () => {
            console.log('Server running at: http://localhost:3000/');
        });
    }
}