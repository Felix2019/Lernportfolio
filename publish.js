var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  
  conn.createChannel(function(err, ch) {
    
    var ex = 'logs';
    var msg ="Die Nachricht ist angekommen, super."

    ch.assertExchange(ex, 'fanout', {durable: false});
    
    ch.publish(ex, '', new Buffer(msg));
    console.log(" [x] Sent %s", msg);
    
  });

  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});





