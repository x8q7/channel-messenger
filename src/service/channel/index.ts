import mysql2 from "mysql2"
import logger from "../../logger";
import { query, querySync } from "../../mysql";
import { PageNum, PrimaryKey } from "../../mysql/model/table";

// 获取channel info
export async function getChannelById(id: PrimaryKey, pageNum: PageNum, PageSize: PageNum) {
    try {
        let rows: Array<any> = await querySync('SELECT id, name FROM channel WHERE id = ? limit ?,?;', [id, pageNum * PageSize, PageSize]);
        return rows;
    } catch (error) {
        logger.error(`error=${error}`);
        return null;
    }
}

// 创建 channel
export async function createChannel(name: string) {
    try {
        let _date: Date = new Date();
        let result: any = await querySync('INSERT INTO channel (`name`, `createAt`, `updateAt`) VALUES(?, ?, ?);', [name, _date, _date]);
        return result;
    } catch (error) {
        logger.error(`error=${error}`);
        return null;
    }
}

// 查 channel list
export async function getChannelList(pageNum: PageNum, PageSize: PageNum) {
    try {
        let rows: mysql2.RowDataPacket = await querySync('SELECT id, name FROM channel limit ?,?;', [pageNum * PageSize, PageSize]);
        return rows;
    } catch (error) {
        logger.error(`error=${error}`);
        return null;
    }
}