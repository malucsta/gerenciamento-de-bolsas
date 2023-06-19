import { AlunoRepository } from "../../infra/repositories/alunoRepository";
import Aluno from "../entities/aluno";
import InstitutoService from "./institutoService";

export default class AlunoService {
    private alunoRepository : AlunoRepository;
    private institutoService: InstitutoService;

    constructor() {
       this.alunoRepository = new AlunoRepository();
       this.institutoService = new InstitutoService()
    }
    
    public async create(aluno: Aluno) {
        const instituto = await this.institutoService.findOne(aluno.idInstituto)

        if(instituto.length < 1) {
            throw new Error('Bad request!')
        }
        return this.alunoRepository.create(aluno)
    }

    public async getAll() {
        return this.alunoRepository.getAll();
    }
}