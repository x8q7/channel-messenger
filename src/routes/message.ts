import { Router, Request, Response } from 'express';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { BackData, Code } from '../code';
import { isNumber, isString } from '../utils/validate';
import { PrimaryKey } from '../mysql/model/table';
import { addMessage, getMessageList } from '../service/message';
let router: Router = Router();

// 添加消息
router.post('/add', async (req: Request, res: Response) => {
    let channelId: PrimaryKey = req.body.channelId;
    let title: string = req.body.title;
    let content: string = req.body.content;
    // 验证参数
    if (!isNumber(channelId) || !isString(title) || !isString(content)) {
        res.send(BackData(Code.PARAMS_ERR, 'PARAMS: ERROR', {}));
        return;
    }

    let _result: ResultSetHeader | null = await addMessage(channelId, title, content);
    if (!_result) {
        res.send(BackData(Code.DB_ERR, 'DB: ERROR', {}));
        return;
    }
    res.send(BackData(Code.OK, 'ok', {}));
});

// 查频道 消息
router.get('/:channelId', async (req: Request, res: Response) => {
    let channelId: number = parseInt(req.params.channelId);
    let pageNum: number = parseInt(req.query.pageNum as string) || 0;
    let pageSize: number = parseInt(req.query.pageSize as string) || 10;
    // 验证参数
    if (!isNumber(channelId) || !isNumber(pageNum) || !isNumber(pageSize)) {
        res.send(BackData(Code.PARAMS_ERR, 'PARAMS: ERROR', {}));
        return;
    }

    let _row: RowDataPacket[] | null = await getMessageList(channelId, pageNum, pageSize);
    if (!_row) {
        res.send(BackData(Code.DB_ERR, 'DB: ERROR', {}));
        return;
    }
    res.send(BackData(Code.OK, 'ok', _row));

});

module.exports = router;