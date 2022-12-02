import * as process from "process";
import * as mysql2 from "mysql2";
import logger from "../logger";

const pool: mysql2.Pool = mysql2.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB,
    password: process.env.MYSQL_PWD,
    waitForConnections: true,
    connectionLimit: parseInt(process.env.MYSQL_CONNECT_LIMIT as string) || 10,
    queueLimit: parseInt(process.env.MYSQL_QUEUE_LIMIT as string) || 0,
});

export function query(sql: string, params: Array<any>, cb: Function) {
    pool.query(sql, params, function (err, rows, fields) {
        if (err) {
            logger.error(`[DB-ERR] sql=(${sql}), params=${JSON.stringify(params)} err=${err}`);
        }
        cb(err, rows, fields)
    })
}

export function querySync(sql: string, params: Array<any>): Promise<any> {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, function (err, rows, fields) {
            if (err) {
                reject(err);
                logger.error(`[DB-ERR] sql=(${sql}), params=${JSON.stringify(params)} err=${err}`);
            }
            resolve(rows);
        })
    });
}