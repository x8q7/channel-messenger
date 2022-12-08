import process from 'process';
import app from "./index";
import logger from './logger';


// Server setup
app.listen(process.env.SERVER_PORT, () => {
    logger.log(`Express listen port: ${process.env.SERVER_PORT}`);
});