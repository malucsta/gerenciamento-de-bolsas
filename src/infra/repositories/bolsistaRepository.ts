import Bolsista from '@src/domain/entities/bolsista';
import { pool } from '../connection';

export class BolsistaRepository {

  async create(bolsista: Bolsista) {
    try {
      await pool.query(`INSERT INTO Bolsista (matricula_aluno, id_bolsa) VALUES ($1, $2)`, [bolsista.matriculaAluno, bolsista.idBolsa])
    } catch (error) {
      console.error('Error executing query:', error);
    }
  }

  async findOne(matriculaAluno: number) {
    try {
      const result = (await pool.query('SELECT * FROM Bolsista WHERE matricula_aluno = $1 LIMIT 1', [matriculaAluno])).rows
      return result
  } catch (error) {
      console.error('Error executing query:', error);
      throw error
  }
  }
    
  async getAll() {
      try {
        return (await pool.query('SELECT * FROM Bolsista')).rows;
      } catch (error) {
        console.error('Error executing query:', error);
      }

      return null;
  }
}