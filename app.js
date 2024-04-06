// Import the necessary modules
const express = require("express");
const winston = require("winston");
const logger = require('./logger');

// Initialize an Express application
const app = express();

// Set the port for the server to listen on
const port = 3040;

// In non-production environments, also log to the console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// Define the addition function
const add = (n1, n2) => {
  return n1 + n2;
}

// Define the /add endpoint for the addition operation
app.get("/add", (req, res) => {
  try {
    // Parse and validate the input parameters
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
    }

    // Log the received parameters
    logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for addition');

    // Perform the addition operation and send the result
    const result = add(n1, n2);
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    // Log and return any errors
    console.error(error)
    res.status(500).json({ statuscocde: 500, msg: error.toString() })
  }
});

// Start the Express server
app.listen(port, () => {
  console.log("Listening on port " + port);
});
