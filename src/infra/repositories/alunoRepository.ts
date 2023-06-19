import Aluno from '@src/domain/entities/aluno';
import { pool } from '../connection';

export class AlunoRepository {

  async create(aluno: Aluno) {
    try {
      await pool.query(`INSERT INTO Aluno (matricula, cpf, nome, id_instituto) VALUES (${aluno.matricula}, ${aluno.cpf}, ${aluno.nome}, ${aluno.idInstituto})`)
    } catch (error) {
      console.error('Error executing query:', error);
    }
  }

  async findOne(matricula: number) {
    try {
      const result = (await pool.query('SELECT * FROM Aluno WHERE matricula = $1 LIMIT 1', [matricula])).rows
      return result
  } catch (error) {
      console.error('Error executing query:', error);
      throw error
  }
  }
    
  async getAll() {
      try {
        return (await pool.query('SELECT * FROM Aluno')).rows;
      } catch (error) {
        console.error('Error executing query:', error);
      }

      return null;
  }
}