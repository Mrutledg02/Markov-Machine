const MarkovMachine = require('./markov');

describe('MarkovMachine', () => {
    test('Should generate similar output for same input', () => {
        const inputText = 'the cat in the hat';
        const mm1 = new MarkovMachine(inputText);
        const mm2 = new MarkovMachine(inputText);
        const generatedText1 = mm1.makeText();
        const generatedText2 = mm2.makeText();
        // Check if generated texts contain some overlapping words
        expect(generatedText1).toMatch(/(the|cat|in|the|hat)/);
        expect(generatedText2).toMatch(/(the|cat|in|the|hat)/);
        });

    test('Should generate text of expected length', () => {
        const inputText = 'the cat in the hat';
        const mm = new MarkovMachine(inputText);
        const numWords = 50;
        const generatedText = mm.makeText(numWords);
        const generatedWords = generatedText.split(' ').filter(word => word !== '');
        expect(generatedWords.length).toEqual(numWords);
    });

    test('Should handle punctuation and special characters', () => {
        const inputText = 'hello! How are you?';
        const mm = new MarkovMachine(inputText);
        const generatedText = mm.makeText();
        expect(generatedText).toMatch(/[^\w\s]/);
    });

    test('Should explore various paths through Markov chains', () => {
        const inputText = 'the cat in the hat';
        const mm = new MarkovMachine(inputText);
        const numTests = 10;
        const generatedTexts = Array.from({ length: numTests }, () => mm.makeText());
        const uniqueTexts = [...new Set(generatedTexts)];
        expect(uniqueTexts.length).toBeGreaterThan(1);
    });

    test('Should generate 100 random words by default', () => {
        const inputText = 'the cat in the hat';
        const mm = new MarkovMachine(inputText);
        const generatedText = mm.makeText(); // Use default numWords = 100
        const generatedWords = generatedText.split(' ').filter(word => word !== '');
    
        // Debug output to see generated words
        console.log("Generated words:", generatedWords);
    
        // Check if generatedWords is not empty
        expect(generatedWords.length).toBeGreaterThan(0);
    
        // Check if the length is close to 100 with some tolerance
        if (generatedWords.length > 0) {
            expect(generatedWords.length).toBeCloseTo(100);
        }
    });
});