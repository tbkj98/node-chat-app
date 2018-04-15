document.getElementById('send').addEventListener('click', sendMessage);
var message = document.getElementById('message');


var socket = io();
socket.on('connect', function () {
    console.log('connected');
});

socket.on('disconnect', function () {
    console.log('disconnected');
});

socket.on('welcome', function (message) {
    console.log(message);
});

socket.on('newUserJoins', function (message) {
    console.log(message);
});

socket.on('newMessage', function (message) {
    response.innerHTML = message.message;
    // console.log(message);
});

function sendMessage () {

    socket.emit('sendMessage', message.value);
    console.log('Message sent');
    
    message.value = '';
}