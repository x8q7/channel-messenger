import logger from "../../logger";
import { query, querySync } from "../../mysql";
import { PageNum, PrimaryKey } from "../../mysql/model/table";
import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2'


// 添加消息
export async function addMessage(channelId: PrimaryKey, title: string, content: string): Promise<ResultSetHeader | null> {
    try {
        let _date: Date = new Date();
        let result: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader = await querySync('INSERT INTO message (`title`, `content`, `channel`, `createAt`, `updateAt`) VALUES(?, ?, ?, ?, ?);', [title, content, channelId, _date, _date]);
        return result as ResultSetHeader;
    } catch (error) {
        logger.error(`error=${error}`);
        return null;
    }
}

// 查频道消息
export async function getMessageList(channelId: PrimaryKey, pageNum: PageNum, pageSize: PageNum): Promise<RowDataPacket[] | null> {
    try {
        let rows: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader = await querySync('SELECT id, title, content, channel, createAt, updateAt FROM message where channel = ? ORDER BY id DESC limit ?,?;', [channelId, pageNum * pageSize, pageSize]);
        return rows as RowDataPacket[];
    } catch (error) {
        logger.error(`error=${error}`);
        return null;
    }
}