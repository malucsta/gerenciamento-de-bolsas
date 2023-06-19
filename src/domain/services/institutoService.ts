import { InstitutoRepository } from "../../infra/repositories/institutoRepository";

export default class InstitutoService {
    private institutoRepository : InstitutoRepository;

    constructor() {
       this.institutoRepository = new InstitutoRepository();
    } 

    public async create(name: string) {
        return this.institutoRepository.create(name);
    }

    public async findOne(institutoId: number) {
        return this.institutoRepository.findOne(institutoId)
    }
}