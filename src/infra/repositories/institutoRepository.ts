import { pool } from '../connection';

export class InstitutoRepository {
    async create(name: string) {
        try {
            await pool.query(`INSERT INTO Instituto (nome) VALUES (${name})`)
        } catch (error) {
            console.error('Error executing query:', error);
            throw error
        }
        
    }

    async findOne(institutoId: number) {
        try {
            const result = (await pool.query('SELECT id, nome FROM Instituto WHERE id = $1 LIMIT 1', [institutoId])).rows
            return result
        } catch (error) {
            console.error('Error executing query:', error);
            throw error
        }
    }
}