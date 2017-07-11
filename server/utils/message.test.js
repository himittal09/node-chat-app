const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should create correct message object', () => {
        var from = 'testUser';
        var text = 'this is test text';
        var message = generateMessage(from, text);
        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should create correct location object', () => {
        var from = 'testUser';
        var url = 'https://www.google.com/maps?q=1,1';
        var message = generateLocationMessage(from, {
            latitude: 1,
            longitude: 1,
            timestamp: new Date().getTime()
        });
        expect(message).toInclude({from, url});
        expect(message.createdAt).toBeA('number');
    });
});