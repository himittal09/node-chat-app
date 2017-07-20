const expect = require('expect');
const {isRealString} = require('./validators');

describe('isRealString', () => {
    it('should reject non-string type input', () => {
        var str = isRealString({name: 'test'});
        expect(str).toBe(false);
    });

    it('should reject a string of spaces and tabs', () => {
        var str = isRealString('                ');
        expect(str).toBe(false);
    });

    it('should return true for a real string', () => {
        var str = isRealString('SomeReal  ');
        expect(str).toBe(true);
    });
});