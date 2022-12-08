import path from 'path';
import express from 'express';
import createError from 'http-errors';
import fs from 'fs';
import logger from './logger';
import * as dotenv from 'dotenv';
dotenv.config();

const app: express.Application = express();
app.use(express.json());

fs.readdir(path.join(__dirname, "routes"), (err: NodeJS.ErrnoException | null, files: string[]) => {
    console.log("load routes");
    files.forEach((fileName: string) => {
        let [_fileName] = fileName.split(".");
        let str: string = path.join(__dirname, "routes", _fileName);
        console.info(str);
        app.use('/' + _fileName, require(path.join(__dirname, "routes", _fileName)));
    });

    // 404
    app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
        next(createError(404));
    });
})

export default app;