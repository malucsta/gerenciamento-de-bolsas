import { pool } from '../../connection';
export class ComboRepository {
    public async findAll() {

        const queryString = 'SELECT id, name, price FROM combo';

        const result = await pool.promise().query(queryString);
        return result[0];

    }


    public async findOne(id: number) {

        const queryString = 'SELECT id, name, price FROM combo WHERE id = ?';

        const result = await pool.promise().query(queryString, id);
        return result[0];

    }


    public async create(name: string) {

        const queryString = 'INSERT INTO combo (name, price) VALUES (?, 0)';

        const result = await pool.promise().query(queryString, name);
        return result[0];

    }


    public async update(id: number, name: string) {

        const queryString = 'UPDATE combo SET name = IFNULL(?, name)  WHERE id = ?';

        const result = await pool.promise().query(queryString, [name, id]);
        return result[0];

    }


    public async delete(id: number) {

        const queryString = 'DELETE FROM combo WHERE id = ?';

        const result = await pool.promise().query(queryString, id);
        return result[0];

    }


    public async updateComboPrice(id: number) {

        const queryString = `
        UPDATE combo
        SET price = (
            SELECT 		SUM(IFNULL(product.price, 0) * IFNULL(combo_item.quantity, 0))  as combo_price 
            FROM 		combo_item 
            INNER JOIN 	product 
            ON 			product.id = combo_item.FK_idProduct
            WHERE 		FK_idCombo = ?)
        WHERE id = ?;
        `;

        const result = await pool.promise().query(queryString, [id, id]);
        return result[0];

    }

} 