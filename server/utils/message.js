function generateMessage (from, text) {
    return {
        from,
        text,
        createdAt: new Date().getTime()
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