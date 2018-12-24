import socketEvents from './socketEvents/notification';

module.exports = function (io) {
  io.on('connection', (socket)=>{
    console.log('Co nguoi ket noi voi '+socket.id);
  })
}
