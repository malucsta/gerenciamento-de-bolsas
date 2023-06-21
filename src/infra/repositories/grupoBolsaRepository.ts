import GrupoBolsa from '@src/domain/entities/grupoBolsa';
import { pool } from '../connection';

export class GrupoBolsaRepository {

  async create(grupoBolsa: GrupoBolsa) {
    try {
      const values = [
        grupoBolsa.nome, 
        grupoBolsa.remuneracao, 
        grupoBolsa.quantidadeTotal, 
        grupoBolsa.quantidadeRestante, 
        grupoBolsa.dataInicio, 
        grupoBolsa.dataFim
      ]
      
      return pool.query(`INSERT INTO GrupoBolsa (nome, remuneracao, quantidade_total, quantidade_restante, data_inicio, data_fim) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`, values)
    } catch (error) {
      console.error('Error executing query:', error);
      throw error
    }
  }
    
  async getAll() {
      try {
        return (await pool.query('SELECT * FROM GrupoBolsa')).rows;
      } catch (error) {
        console.error('Error executing query:', error);
        throw error
      }
  }

  async findOne(idBolsa: number) {
    try {
        const result = (await pool.query('SELECT * FROM GrupoBolsa WHERE id = $1 LIMIT 1', [idBolsa])).rows
        return result
    } catch (error) {
        console.error('Error executing query:', error);
        throw error
    }
  }

  async updateRestante(idBolsa: number, restante: number) {
    try {
      await pool.query('UPDATE GrupoBolsa SET quantidade_restante = $1 WHERE id = $2', [restante, idBolsa])
  } catch (error) {
      console.error('Error executing query:', error);
      throw error
  }
  }
}