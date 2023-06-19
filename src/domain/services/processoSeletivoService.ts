import { ProcessoSeletivoRepository } from "../../infra/repositories/processoSeletivoRepository";
import ProcessoSeletivo from "../entities/processoSeletivo";

export default class ProcessoSeletivoService {
    private processoSeletivoRepository : ProcessoSeletivoRepository;

    constructor() {
       this.processoSeletivoRepository = new ProcessoSeletivoRepository();
    } 

    public async create(processoSeletivo: ProcessoSeletivo) {
        return this.processoSeletivoRepository.create(processoSeletivo);
    }

    public async findOne(processoSeletivoId: number) {
        return this.processoSeletivoRepository.findOne(processoSeletivoId)
    }
}