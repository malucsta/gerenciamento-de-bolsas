import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

export interface ServiceResponse<T> {
    data?: T | null | RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader,
    sucess: boolean,
    message?: string | null
}