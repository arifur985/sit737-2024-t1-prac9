// Import the necessary modules
const express = require("express");
const logger = require('./logger');

// Initialize an Express application
const app = express();

// Set the port for the server to listen on
const port = 3040;

// Define the arithmetic operations
const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => n2 !== 0 ? n1 / n2 : null;

// Define the endpoint for addition
app.get("/add", (req, res) => {
  const n1 = parseFloat(req.query.n1);
  const n2 = parseFloat(req.query.n2);

  if (isNaN(n1) || isNaN(n2)) {
    logger.error("Invalid input for addition");
    return res.status(400).send("Invalid input: n1 and n2 must be numbers");
  }

  const result = add(n1, n2);
  logger.info(`Addition result: ${n1} + ${n2} = ${result}`);
  res.status(200).json({ result });
});

// Define the endpoint for subtraction
app.get("/subtract", (req, res) => {
  const n1 = parseFloat(req.query.n1);
  const n2 = parseFloat(req.query.n2);

  if (isNaN(n1) || isNaN(n2)) {
    logger.error("Invalid input for subtraction");
    return res.status(400).send("Invalid input: n1 and n2 must be numbers");
  }

  const result = subtract(n1, n2);
  logger.info(`Subtraction result: ${n1} - ${n2} = ${result}`);
  res.status(200).json({ result });
});

// Define the endpoint for multiplication
app.get("/multiply", (req, res) => {
  const n1 = parseFloat(req.query.n1);
  const n2 = parseFloat(req.query.n2);

  if (isNaN(n1) || isNaN(n2)) {
    logger.error("Invalid input for multiplication");
    return res.status(400).send("Invalid input: n1 and n2 must be numbers");
  }

  const result = multiply(n1, n2);
  logger.info(`Multiplication result: ${n1} * ${n2} = ${result}`);
  res.status(200).json({ result });
});

// Define the endpoint for division
app.get("/divide", (req, res) => {
  const n1 = parseFloat(req.query.n1);
  const n2 = parseFloat(req.query.n2);

  if (isNaN(n1) || isNaN(n2)) {
    logger.error("Invalid input for division");
    return res.status(400).send("Invalid input: n1 and n2 must be numbers");
  }

  if (n2 === 0) {
    logger.error("Division by zero attempted");
    return res.status(400).send("Division by zero is not allowed");
  }

  const result = divide(n1, n2);
  logger.info(`Division result: ${n1} / ${n2} = ${result}`);
  res.status(200).json({ result });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Calculator microservice listening on port ${port}`);
});
