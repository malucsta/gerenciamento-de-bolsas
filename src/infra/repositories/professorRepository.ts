import Professor from '@src/domain/entities/professor';
import { pool } from '../connection';

export class ProfessorRepository {
    async create(professor: Professor) {
        try {
            return pool.query(`INSERT INTO Professor (matricula, cpf, nome, id_instituto) VALUES ($1, $2, $3, $4)`, [professor.matricula, professor.cpf, professor.nome, professor.idInstituto])
            
        } catch (error) {
            console.error('Error executing query:', error);
            throw error
        }
        
    }

    async setAdmin(matricula: number, idProcessoSeletivo: number) {
        try {
            return pool.query(` INSERT INTO Administrador (matricula_professor, id_processoSeletivo) VALUES ($1, $2)`, [matricula, idProcessoSeletivo])

        } catch (error) {
            console.error('Error executing query:', error);
            throw error
        }
    }

    async isAdmin(matricula: number, idProcessoSeletivo: number) {
        try {
            const result = (await pool.query(
                `SELECT matricula_professor, id_processoSeletivo FROM Administrador WHERE matricula_professor = $1 AND id_processoSeletivo = $2 LIMIT 1`,
                [matricula, idProcessoSeletivo]
                )).rows

            return result
        } catch (error) {
            console.error('Error executing query:', error);
            throw error
        }
    }

    async setOrientador(matricula: number, idBolsa: number) {
        try {
            await pool.query(`INSERT INTO Orientador (matricula_professor, id_bolsa) VALUES ($1, $2)`, [matricula, idBolsa])
            
        } catch (error) {
            console.error('Error executing query:', error);
            throw error
        }
    }

    async findOne(matricula: number) {
        try {
            const query = `
            SELECT P.matricula,
                P.nome,
                ARRAY_AGG(A.id_processoSeletivo) AS processos_administrados,
                ARRAY_AGG(O.id_bolsa) AS bolsas_orientadas
            FROM Professor P
            LEFT JOIN Administrador A ON P.matricula = A.matricula_professor
            INNER JOIN processoseletivo PS ON PS.id = A.id_processoseletivo
            LEFT JOIN Orientador O ON P.matricula = O.matricula_professor
            WHERE P.matricula = $1 and PS.ativo = true
            GROUP BY P.matricula, P.nome;
            `;
            const result = (await pool.query(query,[matricula])).rows
            return result
        } catch (error) {
            console.error('Error executing query:', error);
            throw error
        }
    }
}