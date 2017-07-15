var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message_template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location_message_template').html();
    // console.log('newMessage', message);
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });    
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My Current Location</a>');
    // a.attr('href', message.url);
    // li.text(`${message.from} ${formattedTime}: `);
    // li.append(a);
    jQuery('#messages').append(html);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

jQuery('#message_form').on('submit', function (e) {
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]');
    if (messageTextBox.val() == '')
        return;
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send_location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your Browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location');
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: position.timestamp
        });
        locationButton.removeAttr('disabled').text('Send Location');
    }, function (error) {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Error in sending location', error);
    });
});