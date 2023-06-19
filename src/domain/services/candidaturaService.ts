import { CandidaturaRepository } from "@src/infra/repositories/candidaturaRepository";
import Candidatura from "../entities/candidatura";

export default class CandidaturaService {
    private candidaturaRepository : CandidaturaRepository;

    constructor() {
       this.candidaturaRepository = new CandidaturaRepository();
    }
    
    public async create(candidatura: Candidatura) {
        return this.candidaturaRepository.create(candidatura)
    }

    public async getAll() {
        return this.candidaturaRepository.getAll();
    }

}