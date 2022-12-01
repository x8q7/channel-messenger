import process from "process";
import log4js from "log4js";
log4js.configure({
    appenders: {
        out: { type: "file" , filename: "./logs/out.log"},
        channel: { type: "file", filename: "./logs/channel.log" },
        message: { type: "file", filename: "./logs/message.log" },
    },
    categories: {
        default: { appenders: ["out"], level: "trace" },
        channel: { appenders: ["channel"], level: "trace" },
        message: { appenders: ["message"], level: "trace" },
    },
});

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL as string;

export default logger;