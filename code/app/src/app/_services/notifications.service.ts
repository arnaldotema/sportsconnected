import { Injectable } from '@angular/core';
import { SocketIOService } from "./socket_io.service";
import { Observable, Subject } from 'rxjs/Rx';
import { NotificationViewModel } from "../_models/notification_viewmodel";
import {AuthenticationService} from "./authentication.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class NotificationsService {

  notifications: Subject<NotificationViewModel>;
  requestOptions;
  requestOptionsMultipart;

  // Our constructor calls our wsService connect method
  constructor(private socketService: SocketIOService, private authenticationService: AuthenticationService) {

    this.requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'jwt': authenticationService.token
      })
    };
    this.requestOptionsMultipart = {
      headers: new HttpHeaders({
        'jwt': authenticationService.token
      })
    };

    this.notifications = <Subject<NotificationViewModel>>socketService
      .connect(authenticationService.token)
      .map((response: any): any => {
        return response;
      })
  }

  // Our simplified interface for sending
  // notifications back to our socket.io server
  sendMsg(msg) {
    this.notifications.next(msg);
  }

}
