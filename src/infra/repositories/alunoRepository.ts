import Aluno from '@src/domain/entities/aluno';
import { pool } from '../connection';

export class AlunoRepository {

  async create(aluno: Aluno) {
    try {
      return pool.query(`INSERT INTO Aluno (matricula, cpf, nome, id_instituto) VALUES ($1, $2, $3, $4)`,[aluno.matricula, aluno.cpf, aluno.nome, aluno.idInstituto])
    } catch (error) {
      console.error('Error executing query:', error);
      throw error
    }
  }

  async findOne(matricula: number) {
    try {
      const alunoQuery =  `SELECT Aluno.matricula, Aluno.cpf, Aluno.nome, Aluno.id_instituto FROM Aluno WHERE matricula = $1 LIMIT 1`;
      return (await pool.query(alunoQuery, [matricula])).rows;
  } catch (error) {
      console.error('Error executing query:', error);
      throw error
  }
  }
    
  async getAll() {
      try {
        return (await pool.query('SELECT Aluno.matricula, Aluno.cpf, Aluno.nome, Aluno.id_instituto FROM Aluno')).rows;
      } catch (error) {
        console.error('Error executing query:', error);
      }

      return null;
  }
}