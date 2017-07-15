var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var formattedMessage = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedMessage}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    console.log('newMessage', message);
    var formattedMessage = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    a.attr('href', message.url);
    li.text(`${message.from} ${formattedMessage}: `);
    li.append(a);
    jQuery('#messages').append(li);
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