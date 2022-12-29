import process from 'process';
import * as log4js from 'log4js';
import { Logger } from 'log4js';
log4js.configure({
    appenders: {
        out: { type: 'file', filename: './logs/out.log' },
        channel: { type: 'file', filename: './logs/channel.log' },
        message: { type: 'file', filename: './logs/message.log' },
        mysql: { type: 'file', filename: './logs/mysql.log' }
    },
    categories: {
        default: { appenders: ['out'], level: 'trace' },
        channel: { appenders: ['channel'], level: 'trace' },
        message: { appenders: ['message'], level: 'trace' },
        mysql: { appenders: ['mysql'], level: 'trace' }
    }
});


function getLogger(category?: string): Logger {
    if (!category) {
        const logger = log4js.getLogger();
        logger.level = process.env.LOGGER_LEVEL as string;
        return logger;
    }

    const logger = log4js.getLogger(category);
    logger.level = process.env.LOGGER_LEVEL as string;
    return logger;
}
export default getLogger;