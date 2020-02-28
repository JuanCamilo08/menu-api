const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  level: 'warning',
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.colorize(), format.simple())
    }),
    new transports.File({
      filename: 'logs/combined.log'
    })
  ],
  exceptionHandlers: [
    new transports.File({
      filename: 'logs/error.log'
    })
  ]
});

module.exports.logger = logger;

module.exports.loggingErrors = function() {
  process.on('unhandledRejection', ex => {
    throw ex;
  });

  process.on('uncaughtException', error => {
    logger.error(error.message);
  });
};
