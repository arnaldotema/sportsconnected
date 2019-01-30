let SCWorker = require('socketcluster/scworker');
let express = require('express');
let serveStatic = require('serve-static');
let path = require('path');
let morgan = require('morgan');
let healthChecker = require('sc-framework-health-check');

class Worker extends SCWorker {
  run() {
    console.log('   >> Worker PID:', process.pid);
    let environment = this.options.environment;

    let app = express();

    let httpServer = this.httpServer;
    let scServer = this.scServer;

    if (environment === 'dev') {
      // Log every HTTP request. See https://github.com/expressjs/morgan for other
      // available formats.
      app.use(morgan('dev'));
    }
    app.use(serveStatic(path.resolve(__dirname, 'public')));

    // Add GET /health-check express route
    healthChecker.attach(this, app);

    httpServer.on('request', app);

    let count = 0;

    /*
      In here we handle our incoming realtime connections and listen for events.
    */
    scServer.on('connection', function (socket) {

      // Some sample logic to show how to handle client events,
      // replace this with your own logic

      socket.on('sampleClientEvent', function (data) {
        count++;
        console.log('Handled sampleClientEvent', data);
        scServer.exchange.publish('sample', count);
      });

      let interval = setInterval(function () {
        socket.emit('random', {
          number: Math.floor(Math.random() * 5)
        });
      }, 1000);

      socket.on('disconnect', function () {
        clearInterval(interval);
      });
    });
  }
}

new Worker();
