import winston from 'winston';
import { DateTime } from 'luxon';

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'gray',
  },
};

winston.addColors(customLevels.colors);

// Function to dynamically change log level
let currentLogLevel = 'info';
export const setLogLevel = (level: keyof typeof customLevels.levels) => {
  if (customLevels.levels[level] !== undefined) {
    logger.level = level;
    currentLogLevel = level;
  } else {
    console.warn(`Invalid log level: ${level}`);
  }
};

const logger: winston.Logger = winston.createLogger({
  levels: customLevels.levels,
  level: currentLogLevel,
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => DateTime.now().toUTC().toString(),
    }),
    winston.format.printf((log) => {
      const meta = log.meta ? ` | Meta: ${JSON.stringify(log.meta)}` : '';
      const stack = log.stack ? ` | Stack: ${log.stack}` : '';
      return `${log.timestamp} - ${log.level} - ${log.message}${meta}${stack}`;
    })
  ),
  defaultMeta: { service: 'general-service' },
  transports: [

    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),

    new winston.transports.File({ filename: 'logs/combined.log' }),

    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
  exitOnError: false,
});


export const logErrorWithStack = (error: Error, message: string = '') => {
  logger.error(message, { stack: error.stack });
};

export default logger;
