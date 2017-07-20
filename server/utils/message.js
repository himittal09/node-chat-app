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
        url: `//www.google.com/maps/embed/v1/place?q=${location.latitude},${location.longitude}&zoom=17&key=AIzaSyAteLJQbF_gHqvnCW7ofXzOrjkGLIwMho4`,
        createdAt: location.timestamp
    };
}

module.exports = {generateMessage, generateLocationMessage};