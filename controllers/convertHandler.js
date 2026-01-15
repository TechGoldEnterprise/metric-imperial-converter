function ConvertHandler() {
  
  this.getNum = function(input) {
    // Find the index where the unit starts (first alphabetical character)
    const unitIndex = input.search(/[a-zA-Z]/);
    
    // If no unit found, assume entire input is the number
    if (unitIndex === -1) {
      const num = input || '1';
      const result = parseFloat(num);
      return isNaN(result) ? 1 : result;
    }
    
    // Extract the number part
    const numStr = input.substring(0, unitIndex).trim();
    
    // If no number provided, default to 1
    if (!numStr) {
      return 1;
    }
    
    // Handle fractions
    if (numStr.includes('/')) {
      const parts = numStr.split('/');
      
      // Check for double fractions (more than one '/')
      if (parts.length > 2) {
        return null; // Invalid double fraction
      }
      
      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);
      
      // Check if either part is not a valid number
      if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
        return null;
      }
      
      return numerator / denominator;
    }
    
    // Convert to number and check if valid
    const result = parseFloat(numStr);
    return isNaN(result) ? null : result;
  };
  
  this.getUnit = function(input) {
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    // Find where the unit starts
    const unitIndex = input.search(/[a-zA-Z]/);
    
    if (unitIndex === -1) {
      return null; // No unit found
    }
    
    // Extract the unit part and convert to lowercase
    let unit = input.substring(unitIndex).toLowerCase();
    
    // Special case for liters
    if (unit === 'l') {
      unit = 'L';
    }
    
    // Check if unit is valid
    const normalizedUnit = unit.toLowerCase();
    const isValid = validUnits.includes(normalizedUnit) || unit === 'L';
    
    return isValid ? unit : null;
  };
  
  this.getReturnUnit = function(initUnit) {
    const unit = initUnit.toLowerCase();
    const conversionMap = {
      'gal': 'L',
      'l': 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'mi': 'km',
      'km': 'mi'
    };
    
    return conversionMap[unit] || null;
  };
  
  this.spellOutUnit = function(unit) {
    const unitMap = {
      'gal': 'gallons',
      'L': 'liters',
      'l': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    };
    
    return unitMap[unit.toLowerCase()] || '';
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    const unit = initUnit.toLowerCase();
    let result;
    
    switch(unit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        return null;
    }
    
    // Round to 5 decimal places
    return Math.round(result * 100000) / 100000;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);
    
    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };
}

module.exports = ConvertHandler;