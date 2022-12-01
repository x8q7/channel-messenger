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

    let _dir: Array<string> = await fs.readdirSync(path.join(__dirname, "routes"));
    _dir.forEach((fileName: string) => {
        let [_fileName] = fileName.split(".");
        let str: string = path.join(__dirname, "routes", _fileName);
        console.info(str);
        app.use('/' + _fileName, require(path.join(__dirname, "routes", _fileName)));
    });

    app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
        next(createError(404));
    });

    // Server setup
    app.listen(process.env.SERVER_PORT, () => {
        logger.log(`Express listen port: ${process.env.SERVER_PORT}`);
    });
}

main();