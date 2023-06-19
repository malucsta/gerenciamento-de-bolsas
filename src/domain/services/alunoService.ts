import { AlunoRepository } from "../../infra/repositories/alunoRepository";
import Aluno from "../entities/aluno";

export default class AlunoService {
    private alunoRepository : AlunoRepository;

    constructor() {
       this.alunoRepository = new AlunoRepository();
    }
    
    public async create(aluno: Aluno) {
        return this.alunoRepository.create(aluno)
    }

    public async getAll() {
        return this.alunoRepository.getAll();
    }
}