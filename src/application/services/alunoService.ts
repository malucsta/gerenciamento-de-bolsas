import Aluno from "@src/domain/entities/aluno";
import { AlunoRepository } from "@src/persistence/repositories/alunoRepository";

export default class AlunoService {
    private alunoRepository : AlunoRepository;

    constructor() {
       this.alunoRepository = new AlunoRepository();
    } 

    public async GetAll() {
        return await this.alunoRepository.getAll();
    }
}