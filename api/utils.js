/**
 * Converts JSON data to human-readable text.
 *
 * @param {Object|string} jsonData - JSON data as an object or string.
 * @returns {string} Human-readable text representation of the JSON data.
 */
export function jsonToText(jsonData) {
    // Check if input is a string, if so, parse it as JSON
    if (typeof jsonData === 'string') {
      try {
        jsonData = JSON.parse(jsonData);
      } catch (error) {
        throw new Error('Invalid JSON string');
      }
    }
  
    // Initialize an empty string to store the text representation
    let text = '';
  
    // Define a recursive helper function to convert JSON to text
    function helper(data, indent = 0) {
      // If data is an object, iterate over its properties
      if (typeof data === 'object' && data !== null) {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            text += '  '.repeat(indent) + key + ': ';
            helper(data[key], indent + 1);
          }
        }
      }
      // If data is an array, iterate over its elements
      else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          text += '  '.repeat(indent) + i + ': ';
          helper(data[i], indent + 1);
        }
      }
      // If data is a primitive value, append it to the text
      else {
        text += data.toString() + '\n';
      }
    }
  
    // Call the helper function to start the conversion
    helper(jsonData);
  
    return text;
  }