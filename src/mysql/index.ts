import * as process from "process";
import * as mysql2 from "mysql2";
import getLogger from "../logger";
import { RowDataPacket, ResultSetHeader, OkPacket } from "mysql2";

const pool: mysql2.Pool = mysql2.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB,
    password: process.env.MYSQL_PWD,
    waitForConnections: true,
    connectionLimit: parseInt(process.env.MYSQL_CONNECT_LIMIT as string) || 10,
    queueLimit: parseInt(process.env.MYSQL_QUEUE_LIMIT as string) || 0,
});

export function query(sql: string, params: Array<any>, cb: Function): void {
    pool.query(sql, params, function (err, rows, fields) {
        if (err) {
            getLogger("mysql").error(`[DB-ERR] sql=(${sql}), params=${JSON.stringify(params)} err=${err}`);
        }
        cb(err, rows, fields);
    })
}

export function querySync(sql: string, params: Array<any>): Promise<RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader> {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, function (err, rows, fields) {
            if (err) {
                reject(err);
                getLogger("mysql").error(`[DB-ERR] sql=(${sql}), params=${JSON.stringify(params)} err=${err}`);
            }
            resolve(rows);
        })
    });
}