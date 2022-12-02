import { Router, Request, Response, NextFunction } from "express";
import { getChannelById } from "../service/channel";
import { BackData, Code } from "../code";
import { isNumber } from "../utils/validate";
let router: Router = Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    let channelId: number = parseInt(req.params.id);
    let pageNum: number = parseInt(req.query.pageNum as string);
    let pageSize: number = parseInt(req.query.pageSize as string);
    // 验证参数
    if(!isNumber(channelId) || !isNumber(pageNum) || !isNumber(pageSize)){
        res.send(BackData(Code.PARAMS_ERR, "PARAMS: ERROR", {}));
        return;
    }

    let _row: Array<any> | null = await getChannelById(channelId, pageNum, pageSize);
    if (!_row) {
        res.send(BackData(Code.DB_ERR, "DB: ERROR", {}));
    } else {
        res.send(BackData(Code.OK, "ok", _row));
    }
});

module.exports = router;