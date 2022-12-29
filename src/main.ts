import process from 'process';
import app from './index';
import getLogger from './logger';


// Server setup
app.listen(process.env.SERVER_PORT, () => {
    getLogger().log(`Express listen port: ${process.env.SERVER_PORT}`);
});