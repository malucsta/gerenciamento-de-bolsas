import { pool } from '../../connection';

export class ComboItemRepository {

    public async findAll() {

        const queryString = 'SELECT id, FK_idCombo as idCombo, FK_idProduct as idProduct, quantity FROM combo_item';

        const result = await pool.promise().query(queryString);
        return result[0];
    }

    public async findOne(id: number) {

        const queryString = 'SELECT id, FK_idCombo as idCombo, FK_idProduct as idProduct, quantity FROM combo_item WHERE id = ?';

        const result = await pool.promise().query(queryString, id);
        return result[0];

    }

    public async create(idCombo: number, idProduct: number, quantity: number) {

        const queryString = 'INSERT INTO combo_item (FK_idCombo, FK_idProduct, quantity) VALUES (?, ?, ?);';


        const result = await pool.promise().query(queryString, [idCombo, idProduct, quantity]);

        //just to simplify
        return result[0];
    }

    public async updateQuantity(id: number, quantity: number) {

        const queryString = `                 
            UPDATE combo_item 
            SET quantity = IFNULL(?, quantity)
            WHERE id = ?; `;

        const result = await pool.promise().query(queryString, [quantity, id]);
        return result[0];
    }

    public async delete(id: number) {
        const queryString = 'DELETE FROM combo_item WHERE id = ?';

        const result = await pool.promise().query(queryString, id);
        return result[0];
    }

    public async getComboId(id: number): Promise<number> {

        const queryString = 'select FK_idCombo from combo_item where id = ?';

        const result = await pool.promise().query(queryString, id);
        let object = JSON.parse(JSON.stringify(result[0]))
        Object.values(object).forEach(v => object = v)
        return object.FK_idCombo;
    }
} 