import { InstitutoRepository } from "../../infra/repositories/institutoRepository";

export default class InstitutoService {
    private institutoRepository : InstitutoRepository;

    constructor() {
       this.institutoRepository = new InstitutoRepository();
    } 

    public async create(name: string) {
        return await this.institutoRepository.create(name);
    }
}