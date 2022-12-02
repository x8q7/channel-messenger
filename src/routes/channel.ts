import { Router, Request, Response, NextFunction } from "express";
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { createChannel, getChannelById, getChannelList } from "../service/channel";
import { BackData, Code } from "../code";
import { isNumber, isString } from "../utils/validate";
let router: Router = Router();

// 创建频道
router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
    let channelName: string = req.body.channelName;
    // 验证参数
    if (!isString(channelName)) {
        res.send(BackData(Code.PARAMS_ERR, "PARAMS: ERROR", {}));
        return;
    }

    let _result: ResultSetHeader | null = await createChannel(channelName);
    if (!_result) {
        res.send(BackData(Code.DB_ERR, "DB: ERROR", {}));
        return;
    }
    res.send(BackData(Code.OK, "ok", {}));
});

// 查频道列表
router.get("/list", async (req: Request, res: Response, next: NextFunction) => {
    let pageNum: number = parseInt(req.query.pageNum as string);
    let pageSize: number = parseInt(req.query.pageSize as string);
    // 验证参数
    if (!isNumber(pageNum) || !isNumber(pageSize)) {
        res.send(BackData(Code.PARAMS_ERR, "PARAMS: ERROR", {}));
        return;
    }

    let _row: RowDataPacket | null = await getChannelList(pageNum, pageSize);
    if (!_row) {
        res.send(BackData(Code.DB_ERR, "DB: ERROR", {}));
        return;
    }
    res.send(BackData(Code.OK, "ok", _row));
});

// 查频道消息
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    let channelId: number = parseInt(req.params.id);
    let pageNum: number = parseInt(req.query.pageNum as string);
    let pageSize: number = parseInt(req.query.pageSize as string);
    // 验证参数
    if (!isNumber(channelId) || !isNumber(pageNum) || !isNumber(pageSize)) {
        res.send(BackData(Code.PARAMS_ERR, "PARAMS: ERROR", {}));
        return;
    }

    let _row: Array<any> | null = await getChannelById(channelId, pageNum, pageSize);
    if (!_row) {
        res.send(BackData(Code.DB_ERR, "DB: ERROR", {}));
        return;
    }
    res.send(BackData(Code.OK, "ok", _row));

});

module.exports = router;