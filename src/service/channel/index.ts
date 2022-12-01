import logger from "../../logger";
import { query, querySync } from "../../mysql";
import { PageNum, PrimaryKey } from "../../mysql/model/table";

export async function getChannelById(id: PrimaryKey, pageNum: PageNum, PageSize: PageNum) {
    try {
        let rows: Array<any> = await querySync("SELECT id, name FROM channel WHERE id = ? limit ?,?;", [id, pageNum * PageSize, PageSize]);
        return rows;
    } catch (error) {
        logger.error(`error=${error}`);
        return null;
    }
}