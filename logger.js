// Import the Winston logging library
const winston = require('winston');

// Create a Winston logger configuration
const logger = winston.createLogger({
  // Set the minimum log level to 'info'
  level: 'info',

  // Use JSON format for logging
  format: winston.format.json(),

  // Set default metadata for all log entries
  defaultMeta: { service: 'calculator-microservice' },

  // Define transports for logging
  transports: [
    // Log to the console with a simple format
    new winston.transports.Console({
      format: winston.format.simple(),
    }),

    // Log all errors to a file named 'error.log'
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),

    // Log all log entries (including errors) to a file named 'combined.log'
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Export the logger for use in other files
module.exports = logger;
