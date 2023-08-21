import { createLogger, format, transports } from 'winston';
import * as path from 'path';

const logger = createLogger({
  transports: new transports.File({
    filename: path.join(__dirname, '../../logs/electron.log'),
    format: format.combine(
      format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      format.align(),
      format.printf(
        (info: any) => `${info.level}: ${[info.timestamp]}: ${info.message}`
      )
    ),
  }),
});

export default logger;
