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
    
    async getAll() {
      try {
        return (await pool.query('SELECT * FROM Candidatura')).rows;
      } catch (error) {
        console.error('Error executing query:', error);
      }

      return null;
    }

}