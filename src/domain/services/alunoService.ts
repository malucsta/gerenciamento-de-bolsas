import { AlunoRepository } from "../../infra/repositories/alunoRepository";
import Aluno from "../entities/aluno";
import CandidaturaService from "./candidaturaService";
import InstitutoService from "./institutoService";
import ProcessoSeletivoService from "./processoSeletivoService";

export default class AlunoService {
    private alunoRepository : AlunoRepository;
    private institutoService: InstitutoService;
    private processoSeletivoService: ProcessoSeletivoService;
    private candidaturaService: CandidaturaService;


    constructor() {
       this.alunoRepository = new AlunoRepository();
       this.institutoService = new InstitutoService();
       this.processoSeletivoService = new ProcessoSeletivoService();
       this.candidaturaService = new CandidaturaService();
    }
    
    public async create(aluno: Aluno) {
        const instituto = await this.institutoService.findOne(aluno.idInstituto)

        if(instituto.length < 1) {
            throw new Error('Bad request!')
        }
        return this.alunoRepository.create(aluno)
    }

    public async findOne(matricula: number) {
        return this.alunoRepository.findOne(matricula)

    }
    public async apply(matriculaAluno: number, idProcessoSeletivo: number) {
        const processoSeletivo = await this.processoSeletivoService.findOne(idProcessoSeletivo)
        const aluno = await this.findOne(matriculaAluno)

        if (processoSeletivo.length < 1 || aluno.length < 1) {
            throw new Error('Bad request!')
        }

        return this.candidaturaService.create({matriculaAluno, idProcessoSeletivo, data: new Date()})
    }

    public async getAll() {
        return this.alunoRepository.getAll();
    }
}