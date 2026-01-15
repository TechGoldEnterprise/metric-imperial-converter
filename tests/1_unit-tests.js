const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler');

describe('Unit Tests', function() {
  const convertHandler = new ConvertHandler();
  
  describe('convertHandler.getNum', function() {
    it('should correctly read a whole number input', function() {
      assert.equal(convertHandler.getNum('10L'), 10);
      assert.equal(convertHandler.getNum('5mi'), 5);
    });
    
    it('should correctly read a decimal number input', function() {
      assert.equal(convertHandler.getNum('3.5kg'), 3.5);
      assert.equal(convertHandler.getNum('2.75lbs'), 2.75);
    });
    
    it('should correctly read a fractional input', function() {
      assert.equal(convertHandler.getNum('1/2km'), 0.5);
      assert.equal(convertHandler.getNum('3/4gal'), 0.75);
    });
    
    it('should correctly read a fractional input with a decimal', function() {
      assert.equal(convertHandler.getNum('2.5/5L'), 0.5);
      assert.equal(convertHandler.getNum('1.5/3mi'), 0.5);
    });
    
    it('should correctly return an error on a double-fraction', function() {
      assert.isNull(convertHandler.getNum('3/2/3kg'));
      assert.isNull(convertHandler.getNum('1/2/3/4lbs'));
    });
    
    it('should correctly default to a numerical input of 1 when no numerical input is provided', function() {
      assert.equal(convertHandler.getNum('L'), 1);
      assert.equal(convertHandler.getNum('gal'), 1);
      assert.equal(convertHandler.getNum('mi'), 1);
    });
  });
  
  describe('convertHandler.getUnit', function() {
    it('should correctly read each valid input unit', function() {
      assert.equal(convertHandler.getUnit('10gal'), 'gal');
      assert.equal(convertHandler.getUnit('10L'), 'L');
      assert.equal(convertHandler.getUnit('10mi'), 'mi');
      assert.equal(convertHandler.getUnit('10km'), 'km');
      assert.equal(convertHandler.getUnit('10lbs'), 'lbs');
      assert.equal(convertHandler.getUnit('10kg'), 'kg');
    });
    
    it('should correctly return an error for an invalid input unit', function() {
      assert.isNull(convertHandler.getUnit('10invalid'));
      assert.isNull(convertHandler.getUnit('10meters'));
      assert.isNull(convertHandler.getUnit('10g'));
    });
  });
  
  describe('convertHandler.getReturnUnit', function() {
    it('should return the correct return unit for each valid input unit', function() {
      assert.equal(convertHandler.getReturnUnit('gal'), 'L');
      assert.equal(convertHandler.getReturnUnit('L'), 'gal');
      assert.equal(convertHandler.getReturnUnit('mi'), 'km');
      assert.equal(convertHandler.getReturnUnit('km'), 'mi');
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    });
  });
  
  describe('convertHandler.spellOutUnit', function() {
    it('should correctly return the spelled-out string unit for each valid input unit', function() {
      assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
      assert.equal(convertHandler.spellOutUnit('L'), 'liters');
      assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
      assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
      assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
      assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    });
  });
  
  describe('convertHandler.convert', function() {
    it('should correctly convert gal to L', function() {
      assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
      assert.approximately(convertHandler.convert(5, 'gal'), 18.92705, 0.00001);
    });
    
    it('should correctly convert L to gal', function() {
      assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.00001);
      assert.approximately(convertHandler.convert(10, 'L'), 2.64172, 0.00001);
    });
    
    it('should correctly convert mi to km', function() {
      assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
      assert.approximately(convertHandler.convert(10, 'mi'), 16.09340, 0.00001);
    });
    
    it('should correctly convert km to mi', function() {
      assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.00001);
      assert.approximately(convertHandler.convert(10, 'km'), 6.21373, 0.00001);
    });
    
    it('should correctly convert lbs to kg', function() {
      assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.00001);
      assert.approximately(convertHandler.convert(10, 'lbs'), 4.53592, 0.00001);
    });
    
    it('should correctly convert kg to lbs', function() {
      assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.00001);
      assert.approximately(convertHandler.convert(10, 'kg'), 22.04624, 0.00001);
    });
  });
});