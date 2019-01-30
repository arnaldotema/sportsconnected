let scServer = require('socketcluster/scworker');

scServer.addMiddleware(scServer.MIDDLEWARE_AUTHENTICATE,
    function (req, next) {
        // ...
        if (true) {
            next(); // Allow
        } else {
            var err = new MyCustomAuthenticationFailedError('Authentication failed');
            // Prevent the socket from becoming authenticated (socket.authToken will be null).
            // The socket will still be allowed to connect.
            next(err);
        }
    }
);