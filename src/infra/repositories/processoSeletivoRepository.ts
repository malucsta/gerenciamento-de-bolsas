import ProcessoSeletivo from '@src/domain/entities/processoSeletivo';
import { pool } from '../connection';

export class ProcessoSeletivoRepository {
    async create(processoSeletivo: ProcessoSeletivo) {
        try {
            await pool.query(`INSERT INTO ProcessoSeletivo (id, data_inicio, data_fim, id_bolsa) VALUES ($1, $2, $3, $4)`, [processoSeletivo.id, processoSeletivo.dataInicio, processoSeletivo.dataFim, processoSeletivo.idBolsa])
        } catch (error) {
            console.error('Error executing query:', error);
            throw error
        }
        
    }

    async findOne(processoSeletivoId: number) {
        try {
            const result = (await pool.query('SELECT id, data_inicio, data_fim, ativo, id_bolsa FROM ProcessoSeletivo WHERE id = $1 LIMIT 1', [processoSeletivoId])).rows
            return result
        } catch (error) {
            console.error('Error executing query:', error);
            throw error
        }
    }

    async findOneByBolsa(bolsaId: number) {
        try {
            const result = (await pool.query('SELECT id FROM ProcessoSeletivo WHERE id_bolsa = $1 and ativo = true', [bolsaId])).rows
            return result
        } catch (error) {
            console.error('Error executing query:', error);
            throw error
        }
    }

    async desactivate(processoSeletivoId: number) {
        try {
            await pool.query(`UPDATE ProcessoSeletivo SET ativo = false WHERE id = $1;`, [processoSeletivoId])
        } catch (error) {
            console.error('Error executing query:', error);
            throw error
        }
    }
}