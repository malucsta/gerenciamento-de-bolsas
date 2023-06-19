import Candidatura from '@src/domain/entities/candidatura';
import { pool } from '../connection';

export class CandidaturaRepository {

    async create(candidatura: Candidatura) {
        try {
        await pool.query(`INSERT INTO Candidatura (matricula_aluno, id_processoSeletivo, data) VALUES (${candidatura.matriculaAluno}, ${candidatura.idProcessoSeletivo}, ${candidatura.data})`)
        } catch (error) {
        console.error('Error executing query:', error);
        }
    }

    async findOne(matriculaAluno: number, idProcessoSeletivo: number) {
        try {
            const result = (await pool.query(`
            SELECT * FROM Candidatura 
            WHERE matricula_aluno = $1 AND 
            id_processoSeletivo = $2 
            LIMIT 1
            `,
            [matriculaAluno, idProcessoSeletivo])).rows

            return result
        } catch (error) {
            console.error('Error executing query:', error);
            throw error
        }
    }
    
    async getAll() {
      try {
        return (await pool.query('SELECT * FROM Candidatura')).rows;
      } catch (error) {
        console.error('Error executing query:', error);
      }

      return null;
    }

}