import { AlunoRepository } from "../../infra/repositories/alunoRepository";

export default class AlunoService {
    private alunoRepository : AlunoRepository;

    constructor() {
       this.alunoRepository = new AlunoRepository();
    } 

    public async GetAll() {
        return await this.alunoRepository.getAll();
    }
}