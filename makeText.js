/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');

// Function to generate and print text
function generateAndPrintText(numWords, text) {
  const mm = new MarkovMachine(text);
  const generatedText = mm.makeText(numWords);
  console.log(generatedText);
}

// Function to read text from a file
function readFromFile(filePath) {
  try {
      return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
      console.error(`Error reading file: ${filePath}`);
      process.exit(1); // Exit the program with an error
  }
}

// Function to read text from a URL
async function readFromURL(url) {
  try {
      const response = await axios.get(url);
      return response.data;
  } catch (error) {
      console.error(`Error fetching URL: ${url}`);
      process.exit(1); // Exit the program with an error
  }
}

// Main function to generate text
async function generateText(input) {
  let text;
  if (input.startsWith('http')) {
      text = await readFromURL(input);
  } else {
      text = readFromFile(input);
  }

  const mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

// Check command line arguments
const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error('Usage: node makeText.js [file/url] [path/url]');
  process.exit(1); // Exit the program with an error
}

const inputType = args[0];
const input = args[1];

// Generate text based on input type
if (inputType === 'file') {
  generateText(input);
} else if (inputType === 'url') {
  generateText(input);
} else {
  console.error('Invalid input type. Use "file" or "url".');
  process.exit(1); // Exit the program with an error
}
