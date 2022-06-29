const { createLogger, transports } = require('winston');

const inforLogger = createLogger({
  transports: [
    new transports.File({
      filename: './logs/infoLogs.log',
      level: 'info',
    }),
  ],
});

inforLogger.stream = {
  write: (message, encoding) => {
    inforLogger.info(message);
  },
};
module.exports = inforLogger;
