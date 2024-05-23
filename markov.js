/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};

    for (let i = 0; i < this.words.length - 1; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1];

      if (!this.chains[word]) {
        this.chains[word] = [];
      }

      this.chains[word].push(nextWord);
    }

    // Handling the last word in the text
    const lastWord = this.words[this.words.length - 1];
    if (!this.chains[lastWord]) {
      this.chains[lastWord] = [null];
    } else {
      this.chains[lastWord].push(null);
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let text = [];
    let currentWord = this._getRandomWord();

    // Loop until the length of the generated text reaches numWords
    while (text.length < numWords && currentWord !== null) {
        text.push(currentWord);
        currentWord = this._getRandomNextWord(currentWord);
    }

    // If the generated text is shorter than numWords, add more words from the beginning
    if (text.length < numWords) {
        let remainingWords = numWords - text.length;
        let additionalText = this.makeText(remainingWords);
        text = text.concat(additionalText.split(' '));
    }

    // Trim excess words if generated text is longer than numWords
    if (text.length > numWords) {
        text = text.slice(0, numWords);
    }

    return text.join(" ");
  }

  _getRandomWord() {
    const words = Object.keys(this.chains);
    return words[Math.floor(Math.random() * words.length)];
  }

  _getRandomNextWord(word) {
    const possibleNextWords = this.chains[word];
    return possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
  }
}

module.exports = MarkovMachine;