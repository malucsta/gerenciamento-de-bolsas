import Professor from '@src/domain/entities/professor';
import { pool } from '../connection';

export class ProfessorRepository {
    async create(professor: Professor) {
        try {
            await pool.query(`INSERT INTO Professor (matricula, cpf, nome, id_instituto) VALUES (${professor.matricula}, ${professor.cpf}, ${professor.nome}, ${professor.idInstituto})`)
        } catch (error) {
            console.error('Error executing query:', error);
            throw error
        }
        
    }

    async setAdmin(matricula: number, idProcessoSeletivo: number) {
        try {
            await pool.query(`INSERT INTO Administrador (matricula_professor, id_processoSeletivo) VALUES (${matricula}, ${idProcessoSeletivo})`)
        } catch (error) {
            console.error('Error executing query:', error);
            throw error
        }
    }

    async setOrientador(matricula: number, idBolsa: number) {
        try {
            await pool.query(`INSERT INTO Orientador (matricula_professor, id_bolsa) VALUES (${matricula}, ${idBolsa})`)
        } catch (error) {
            console.error('Error executing query:', error);
            throw error
        }
    }

    async findOne(matricula: number) {
        try {
            const result = (await pool.query('SELECT * FROM Professor WHERE matricula = $1 LIMIT 1', [matricula])).rows
            return result
        } catch (error) {
            console.error('Error executing query:', error);
            throw error
        }
    }
}