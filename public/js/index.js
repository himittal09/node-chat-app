var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //     from: 'A goodman',
    //     text: 'Movie at 18, what say guys?'
    // });
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});