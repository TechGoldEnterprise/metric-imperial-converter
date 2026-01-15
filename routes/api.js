const express = require('express');
const router = express.Router();
const ConvertHandler = require('../controllers/convertHandler');

router.get('/convert', (req, res) => {
  const input = req.query.input;
  
  if (!input) {
    return res.json({ error: 'No input provided' });
  }
  
  const convertHandler = new ConvertHandler();
  
  // Get the number and unit from input
  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);
  
  // Error handling
  let error = null;
  
  if (initNum === null && initUnit === null) {
    error = 'invalid number and unit';
  } else if (initNum === null) {
    error = 'invalid number';
  } else if (initUnit === null) {
    error = 'invalid unit';
  }
  
  if (error) {
    return res.json({ error });
  }
  
  // Perform conversion
  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const returnNum = convertHandler.convert(initNum, initUnit);
  const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
  
  res.json({
    initNum,
    initUnit,
    returnNum,
    returnUnit,
    string
  });
});

module.exports = router;