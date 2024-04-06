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
const power = (base, exponent) => Math.pow(base, exponent);
const sqrt = (number) => Math.sqrt(number);
const modulo = (dividend, divisor) => dividend % divisor;

// Define the endpoint for each operation
app.get("/add", (req, res) => handleOperation(req, res, add, 'addition'));
app.get("/subtract", (req, res) => handleOperation(req, res, subtract, 'subtraction'));
app.get("/multiply", (req, res) => handleOperation(req, res, multiply, 'multiplication'));
app.get("/divide", (req, res) => handleOperation(req, res, divide, 'division'));
app.get("/power", (req, res) => handleOperation(req, res, power, 'power'));
app.get("/sqrt", (req, res) => handleOperation(req, res, sqrt, 'square root', false));
app.get("/modulo", (req, res) => handleOperation(req, res, modulo, 'modulo'));

// Function to handle arithmetic operations
function handleOperation(req, res, operation, operationName, requiresTwoParams = true) {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);

    if (isNaN(n1) || (requiresTwoParams && isNaN(n2))) {
        logger.error(`Invalid input for ${operationName}`);
        return res.status(400).send(`Invalid input: n1 and ${requiresTwoParams ? 'n2' : ''} must be numbers`);
    }

    if (operationName === 'division' && n2 === 0) {
        logger.error("Division by zero attempted");
        return res.status(400).send("Division by zero is not allowed");
    }

    const result = requiresTwoParams ? operation(n1, n2) : operation(n1);
    logger.info(`${operationName} result: ${result}`);
    res.status(200).json({ result });
}

// Start the Express server
app.listen(port, () => {
  console.log(`Calculator microservice listening on port ${port}`);
});
