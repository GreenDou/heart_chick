import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';

import { app } from './app';
import { config } from '../config'; 

let creds = {};

// Functions below come from Google Cloud developer documentation.

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val:number|string) {
  let port:number;
  if (typeof val === 'string') {
    port = parseInt(val, 10);
  } else {
    port = val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error:any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}

let port = normalizePort(process.env.PORT || config().server.port);
let server = http.createServer(app.callback());
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
