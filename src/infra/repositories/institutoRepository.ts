import { pool } from '../connection';

export class InstitutoRepository {
    async create(name: string) {
        try {
            await pool.query(`INSERT INTO Instituto (nome) VALUES (${name})`)
            return
        } catch (error) {
            console.error('Error executing query:', error);
            throw error
        }
        
    }
}