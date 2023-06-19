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
    
  async getAll() {
      try {
        return (await pool.query('SELECT * FROM Aluno')).rows;
      } catch (error) {
        console.error('Error executing query:', error);
      }

      return null;
  }
}