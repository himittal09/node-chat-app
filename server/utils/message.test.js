const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should create correct message object', () => {
        var from = 'testUser';
        var text = 'this is test text';
        var message = generateMessage(from, text);
        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA('number');
    });
});