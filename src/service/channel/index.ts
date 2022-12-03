import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2'
import logger from "../../logger";
import { query, querySync } from "../../mysql";
import { PageNum, PageSize, PrimaryKey } from "../../mysql/model/table";


// 获取channel info
export async function getChannelById(id: PrimaryKey, pageNum: PageNum, PageSize: PageSize): Promise<RowDataPacket[] | null> {
    try {
        let rows: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader = await querySync('SELECT id, name FROM channel WHERE id = ? limit ?,?;', [id, pageNum * PageSize, PageSize]);
        return rows as RowDataPacket[];
    } catch (error) {
        logger.error(`error=${error}`);
        return null;
    }
}

// 创建 channel
export async function createChannel(name: string): Promise<ResultSetHeader | null> {
    try {
        let _date: Date = new Date();
        let result: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader = await querySync('INSERT INTO channel (`name`, `createAt`, `updateAt`) VALUES(?, ?, ?);', [name, _date, _date]);
        return result as ResultSetHeader;
    } catch (error) {
        logger.error(`error=${error}`);
        return null;
    }
}

// 查 channel list
export async function getChannelList(pageNum: PageNum, PageSize: PageNum): Promise<RowDataPacket[] | null> {
    try {
        let rows: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader = await querySync('SELECT id, name FROM channel limit ?,?;', [pageNum * PageSize, PageSize]);
        return rows as RowDataPacket[];
    } catch (error) {
        logger.error(`error=${error}`);
        return null;
    }
}