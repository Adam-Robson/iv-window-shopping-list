# iv-window-shopping-list
## approach

  1.  draw it out
  1.  give names to things
  1.  be modular
  1.  many one small steps
  1.  repeat, embrace, release
  1.  test

### jest
  example 
    1.) sum.js:
      function sum(a, b) {
        return a + b;
      }
      module.exports = sum;
    2.) sum.test.js:
      const sum = require('./sum');
      import { sum } from './sum';
      test('adds 1 + 2 to equal 3', () => {
      expect(sum(1, 2)).toBe(3);
      });
    3.) 
    4.) run npm test
    
  To learn about the other things that Jest can test, see Jest docs.