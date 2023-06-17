import Aluno from "@src/domain/entities/aluno";
import IAlunoRepository from "@src/domain/repositories/IAlunoRepository";
import { connection, pool } from '../../connection';

export class AlunoRepository {
    
    async getAll() {

        try {
            console.log("Rpeository")
        
        const queryString = 'SELECT * FROM Aluno';
        console.log(`String: ${queryString}`)
        //const rows = await pool.promise().query(queryString);


        const teste = connection.query(queryString);

        console.log(`Rows: ${teste}`)

        return teste;
          } catch (error) {
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