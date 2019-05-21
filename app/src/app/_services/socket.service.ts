import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from '../../environments/environment';

import * as socketIo from 'socket.io-client';
import { AuthenticationService } from './authentication.service';
// const patch = require('socketio-wildcard')(socketIo.Manager);

@Injectable()
export class SocketService {
    private socket: SocketIOClient.Socket;

    constructor(
        private auth: AuthenticationService,
        private zone: NgZone
    ) {
        this.initSocket();
    }

    public initSocket(): void {
        this.zone.runOutsideAngular(() => {
            this.socket = socketIo(environment.socketUrl,
                {
                    query: {
                        token: this.auth.currentUserValue.token
                    },
                    transports: ['websocket'],
                    forceNew: true
                });
        });

        // patch(this.socket);
        // this.logAllEvents();
    }

    public emit(event: string, data: any): void {
        this.socket.emit(event, data);
    }

    public on<T>(event: string): Observable<T> {
        return new Observable<T>(observer => {
            this.socket.on(event, (data) => observer.next(data));
        });
    }
}
