import { ProcessoSeletivoRepository } from "../../infra/repositories/processoSeletivoRepository";
import ProcessoSeletivo from "../entities/processoSeletivo";
import GrupoBolsaService from "./grupoBolsaService";

export default class ProcessoSeletivoService {
    private processoSeletivoRepository: ProcessoSeletivoRepository;
    private grupoBolsaService: GrupoBolsaService;

    constructor() {
       this.processoSeletivoRepository = new ProcessoSeletivoRepository();
       this.grupoBolsaService = new GrupoBolsaService()
    } 

    public async create(processoSeletivo: ProcessoSeletivo) {
        const grupoBolsa = await this.grupoBolsaService.findOne(processoSeletivo.idBolsa)

        if(grupoBolsa.length < 1) {
            throw new Error('Grupo Bolsa not found')
        }

        return this.processoSeletivoRepository.create(processoSeletivo);
    }

    public async findOne(processoSeletivoId: number) {
        return this.processoSeletivoRepository.findOne(processoSeletivoId)
    }

    public async desactivate(processoSeletivoId: number) {
        return this.processoSeletivoRepository.desactivate(processoSeletivoId)
    }
}