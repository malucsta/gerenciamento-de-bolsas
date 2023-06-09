import { GrupoBolsaRepository } from "../../infra/repositories/grupoBolsaRepository";
import GrupoBolsa from "../entities/grupoBolsa";

export default class GrupoBolsaService {
    private grupoBolsaRepository : GrupoBolsaRepository;

    constructor() {
       this.grupoBolsaRepository = new GrupoBolsaRepository();
    }
    
    public async create(grupoBolsa: GrupoBolsa) {
        return this.grupoBolsaRepository.create(grupoBolsa)
    }

    public async getAll() {
        return this.grupoBolsaRepository.getAll();
    }

    public async updateRestante(idBolsa: number, restante: number) {
        return this.grupoBolsaRepository.updateRestante(idBolsa, restante)
    }

    public async findOne(idBolsa: number) {
        return this.grupoBolsaRepository.findOne(idBolsa)
    }
}