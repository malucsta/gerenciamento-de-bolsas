import { TransactionRepository } from "../../infra/repositories/transactionRepository";
import { ProcessoSeletivoRepository } from "../../infra/repositories/processoSeletivoRepository";
import ProcessoSeletivo from "../entities/processoSeletivo";
import GrupoBolsaService from "./grupoBolsaService";

export default class ProcessoSeletivoService {
    private processoSeletivoRepository: ProcessoSeletivoRepository;
    private grupoBolsaService: GrupoBolsaService;
    private transactionRepository: TransactionRepository;

    constructor() {
       this.processoSeletivoRepository = new ProcessoSeletivoRepository();
       this.grupoBolsaService = new GrupoBolsaService()
       this.transactionRepository = new TransactionRepository()
    } 

    public async create(processoSeletivo: ProcessoSeletivo, matriculaProfessor: number) {
        const grupoBolsa = await this.grupoBolsaService.findOne(processoSeletivo.idBolsa)

        if(grupoBolsa.length < 1) throw new Error('Grupo Bolsa not found')

        const processoSeletivoParaBolsa = await this.processoSeletivoRepository.findOneByBolsa(processoSeletivo.idBolsa);
        if (processoSeletivoParaBolsa.length > 0) throw new Error('Já existe um processo seletivo para essa bolsa');

        return await this.transactionRepository.criarProcessoSeletivoESetarAdmin(processoSeletivo, matriculaProfessor);
    }

    public async findOne(processoSeletivoId: number) {
        return this.processoSeletivoRepository.findOne(processoSeletivoId)
    }

    public async findAll() {
        return this.processoSeletivoRepository.findAll()
    }

    public async desactivate(processoSeletivoId: number) {
        return this.processoSeletivoRepository.desactivate(processoSeletivoId)
    }
}