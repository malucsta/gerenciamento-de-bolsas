import ProcessoSeletivo from '@src/domain/entities/processoSeletivo';
import { pool } from '../connection';

export class ProcessoSeletivoRepository {
    async create(processoSeletivo: ProcessoSeletivo) {
        try {
            await pool.query(`INSERT INTO ProcessoSeletivo (id, data_inicio, data_fim, id_bolsa) VALUES (${processoSeletivo.id}, ${processoSeletivo.dataInicio}, ${processoSeletivo.dataFim}, ${processoSeletivo.idBolsa})`)
        } catch (error) {
            console.error('Error executing query:', error);
            throw error
        }
        
    }

    async findOne(processoSeletivoId: number) {
        try {
            const result = (await pool.query('SELECT * FROM ProcessoSeletivo WHERE id = $1 LIMIT 1', [processoSeletivoId])).rows
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