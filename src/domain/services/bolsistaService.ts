import { BolsistaRepository } from "@src/infra/repositories/bolsistaRepository";
import Candidatura from "../entities/candidatura";
import GrupoBolsa from "../entities/grupoBolsa";
import CandidaturaService from "./candidaturaService";
import GrupoBolsaService from "./grupoBolsaService";
import ProfessorService from "./professorService";

export default class BolsistaService {
    private bolsistaRepository : BolsistaRepository;
    private candidaturaService: CandidaturaService;
    private grupoBolsaService: GrupoBolsaService;
    private professorService: ProfessorService;


    constructor() {
       this.bolsistaRepository = new BolsistaRepository();
       this.candidaturaService = new CandidaturaService();
       this.grupoBolsaService = new GrupoBolsaService();
       this.professorService = new ProfessorService();
    }
    
    public async create(matriculaAluno: number, idProcessoSeletivo: number, idBolsa: number, matriculaProfessor: number) {
        const bolsaExists: GrupoBolsa[] = await this.grupoBolsaService.findOne(idBolsa)
        const candidaturaExists: Candidatura[] = await this.candidaturaService.findOne(matriculaAluno, idBolsa)

        if(bolsaExists.length < 1 || candidaturaExists.length < 1) {
            throw new Error('Bolsa or Candidatura not found!')
        }
        const [bolsa] = bolsaExists
        if (bolsa.quantidadeRestatnte > 0 /*|| comparar bolsa.dataFim com date.now()*/) {
            throw new Error('Invalid Bolsa!')
        }

        if (!(await this.professorService.isAdmin(matriculaProfessor, idProcessoSeletivo))) {
            throw new Error('Professor is not Admin!')
        }
        await this.bolsistaRepository.create({matriculaAluno, idBolsa})
        await this.grupoBolsaService.updateRestante(idBolsa, bolsa.quantidadeRestatnte - 1)
        
    }

    public async findOne(matricula: number) {
        return this.bolsistaRepository.findOne(matricula)

    }
    
    public async getAll() {
        return this.bolsistaRepository.getAll();
    }
}