import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class SocketIOService {

  // Our socket connection
  private socket;

  constructor() { }

  connect(token): Rx.Subject<MessageEvent> {

    this.socket = io("localhost:3000", token);

    let observable = new Observable(observer => {
      this.socket.on('recommendation', (data) => {
        console.log("Received message from Websocket Server");
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });

    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    let observer = {
      next: (data) => {
        this.socket.emit(data.event_type, JSON.stringify(data));
      },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Rx.Subject.create(observer, observable);
  }

}
