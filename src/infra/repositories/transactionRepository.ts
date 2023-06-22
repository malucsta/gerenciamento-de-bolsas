import Bolsista from '@src/domain/entities/bolsista';
import { pool } from '../connection';
import ProcessoSeletivo from '@src/domain/entities/processoSeletivo';
import { error } from 'console';

export class TransactionRepository {
    async inserirBolsistaEAtualizarGrupoBolsa(bolsista: Bolsista, restante: number) {
        try {
            await pool.query('BEGIN'); // Inicia a transação
            await pool.query(`INSERT INTO Bolsista (matricula_aluno, id_bolsa) VALUES ($1, $2)`, [bolsista.matriculaAluno, bolsista.idBolsa])
            await pool.query('UPDATE GrupoBolsa SET quantidade_restante = $1 WHERE id = $2', [restante, bolsista.idBolsa])
            await pool.query('COMMIT'); // Confirma a transação
        } catch (error) {
            console.error('Error executing query:', error);
            await pool.query('ROLLBACK'); // Desfaz a transação em caso de erro
            throw error
        } 
    }

     async criarProcessoSeletivoESetarAdmin(processoSeletivo: ProcessoSeletivo, matricula: number) {
        try {
            await pool.query('BEGIN'); // Inicia a transação
            await pool.query(`INSERT INTO ProcessoSeletivo (id, data_inicio, data_fim, id_bolsa) VALUES ($1, $2, $3, $4)`, [processoSeletivo.id, processoSeletivo.dataInicio, processoSeletivo.dataFim, processoSeletivo.idBolsa])
            await pool.query(`INSERT INTO Administrador (matricula_professor, id_processoSeletivo) VALUES ($1, $2)`, [matricula, processoSeletivo.id])
            await pool.query('COMMIT'); // Confirma a transação
        } catch (error) {
            console.error('Error executing query:', error);
            await pool.query('ROLLBACK'); // Desfaz a transação em caso de erro
            throw error
        } 
     }
}