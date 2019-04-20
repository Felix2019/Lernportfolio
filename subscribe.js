var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'logs';

    ch.assertExchange(ex, 'fanout', {durable: false}); // exchange: entscheidet an welche queue die msg geschickt wird, fanout: an alle verfügbaren queues

    ch.assertQueue('', {exclusive: true}, function(err, q) { // exclusive: queue wird gelöscht bei verbindungsabbruch 
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      ch.bindQueue(q.queue, ex, ''); // relationship between exchange and a queue is called a binding.

      ch.consume(q.queue, function(msg) {
        if(msg.content) {
          console.log(" [x] %s", msg.content.toString());
        }
      }, {noAck: true});
    });
  });
});