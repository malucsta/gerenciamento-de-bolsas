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
      const alunoQuery =  `
      SELECT A.*, ARRAY_AGG(C.id_processoSeletivo) AS processos_seletivos
      FROM Aluno A
      INNER JOIN Candidatura C ON A.matricula = C.matricula_aluno
      INNER JOIN processoseletivo P ON C.id_processoseletivo = P.id
      WHERE A.matricula = $1 and P.ativo = true
      GROUP BY A.matricula;`;
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