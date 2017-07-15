const moment = require('moment');

function generateMessage (from, text) {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
}

function generateLocationMessage (from, location) {
    return {
        from,
        url: `https://www.google.com/maps?q=${location.latitude},${location.longitude}`,
        createdAt: location.timestamp
    };
}

module.exports = {generateMessage, generateLocationMessage};