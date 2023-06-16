import { pool } from '../../connection';
export class ProductRepository {


    public async findAll() {

        const queryString = 'SELECT id, name, price FROM product';

        const result = await pool.promise().query(queryString);
        return result[0];

    }


    public async findOne(id: number) {

        const queryString = 'SELECT id, name, price FROM product WHERE id = ?';

        const result = await pool.promise().query(queryString, id);
        return result[0];

    }


    public async getPrice(id: number) {

        const queryString = 'SELECT price FROM product WHERE id = ?';

        const result = await pool.promise().query(queryString, id);
        return result[0];

    }


    public async create(name: string, price: number) {

        const queryString = 'INSERT INTO product (name, price) VALUES (?, ?)';

        const result = await pool.promise().query(queryString, [name, price]);
        return result[0];

    }


    public async update(id: number, name: string, price: number) {

        const queryString = 'UPDATE product SET name = IFNULL(?, name),  price = IFNULL(?, price)  WHERE id = ?';

        const result = await pool.promise().query(queryString, [name, price, id]);
        return result[0];

    }


    public async delete(id: number) {

        const queryString = 'DELETE FROM product WHERE id = ?';

        const result = await pool.promise().query(queryString, id);
        return result[0];

    }
}