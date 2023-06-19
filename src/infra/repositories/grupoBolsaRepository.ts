import GrupoBolsa from '@src/domain/entities/grupoBolsa';
import { pool } from '../connection';

export class GrupoBolsaRepository {

  async create(grupoBolsa: GrupoBolsa) {
    try {
      await pool.query(`INSERT INTO GrupoBolsa (id, data_inicio, data_fim, id_bolsa) VALUES (${grupoBolsa.id}, ${grupoBolsa.dataInicio}, ${grupoBolsa.dataFim}, ${grupoBolsa.id})`)
    } catch (error) {
      console.error('Error executing query:', error);
    }
  }
    
  async getAll() {
      try {
        return (await pool.query('SELECT * FROM GrupoBolsa')).rows;
      } catch (error) {
        console.error('Error executing query:', error);
      }

      return null;
  }
}