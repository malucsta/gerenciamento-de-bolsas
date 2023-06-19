import { ProfessorRepository } from "@src/infra/repositories/professorRepository";
import Professor from "../entities/professor";
import GrupoBolsaService from "./grupoBolsaService";
import InstitutoService from "./institutoService";
import ProcessoSeletivoService from "./processoSeletivoService";

export default class ProfessorService {
    private professorRepository : ProfessorRepository;
    private institutoService: InstitutoService;
    private processoSeletivoService: ProcessoSeletivoService;
    private grupoBolsaService: GrupoBolsaService;

    constructor() {
       this.professorRepository = new ProfessorRepository();
       this.institutoService = new InstitutoService();
       this.processoSeletivoService = new ProcessoSeletivoService();
       this.grupoBolsaService = new GrupoBolsaService()
    }
    
    public async create(professor: Professor) {
        const instituto = await this.institutoService.findOne(professor.idInstituto)

        if(instituto.length < 1) {
            throw new Error('Bad request!')
        }
        return this.professorRepository.create(professor)
    }

    public async findOne(matricula: number) {
        return this.professorRepository.findOne(matricula);
    }

    public async setAdmin(matricula: number, idProcessoSeletivo: number) {
        const isProfessor = await this.findOne(matricula)
        const processoSeletivoExists = await this.processoSeletivoService.findOne(idProcessoSeletivo)

        if (isProfessor.length === 0 || processoSeletivoExists.length === 0) {
            throw new Error('Bad request!')
        }

        return this.professorRepository.setAdmin(matricula, idProcessoSeletivo)
    }

    public async setOrientador(matricula: number, idBolsa: number) {
        const isProfessor = await this.findOne(matricula)
        const bolsaExists = await this.grupoBolsaService.findOne(idBolsa)

        if (isProfessor.length === 0 || bolsaExists.length === 0) {
            throw new Error('Bad request!')
        }

        return this.professorRepository.setOrientador(matricula, idBolsa)
    }
}