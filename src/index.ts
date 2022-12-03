import process from 'process';
import path from 'path';
import express from 'express';
import createError from 'http-errors';
import logger from './logger';
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

export default async function main() {
    const app: express.Application = express();
    app.use(express.json());

    
    let _dir: Array<string> = await fs.readdirSync(path.join(__dirname, "routes"));
    console.log("load routes");
    _dir.forEach((fileName: string) => {
        let [_fileName] = fileName.split(".");
        let str: string = path.join(__dirname, "routes", _fileName);
        console.info(str);
        app.use('/' + _fileName, require(path.join(__dirname, "routes", _fileName)));
    });

    // 404
    app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
        next(createError(404));
    });

    // Server setup
    app.listen(process.env.SERVER_PORT, () => {
        logger.log(`Express listen port: ${process.env.SERVER_PORT}`);
    });
}

main();