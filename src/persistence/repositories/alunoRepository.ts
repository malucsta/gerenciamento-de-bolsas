import Aluno from "@src/domain/entities/aluno";
import { pool } from '../../connection';

export class AlunoRepository {
    
    async getAll() {
        try {
          return (await pool.query('SELECT * FROM Aluno')).rows;
        } 
        catch (error) {
          console.error('Error executing query:', error);
        }
          
        return null;

        // if (!Array.isArray(rows)) {
        //     throw new Error('Invalid query result');
        // }

        // console.log(rows)

        // const alunos: Aluno[] = rows.map((row: any) => ({
        //     matricula: row.matricula,
        //     cpf: row.cpf,
        //     nome: row.name,
        //     idInstituto: row.idInstituto
        // }));

        // return alunos;
    }
}