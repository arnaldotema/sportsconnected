import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from '../_models/chat_message';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  @ViewChild('content') content: ElementRef;
  @ViewChild('chat_input') messageInput: ElementRef;

  msgList: ChatMessage[];

  constructor(
    private route: ActivatedRoute,
  ) {

    this.msgList = [
      {
        id: '0',
        userId: '0',
        message: 'Ola',
        sentAt: '0',
        seenAt: '0'
      },
      {
        id: '0',
        userId: '0',
        message: 'Ola',
        sentAt: '0',
        seenAt: '0'
      },
      {
        id: '1',
        userId: '0',
        message: 'Ola',
        sentAt: '0',
        seenAt: '0'
      },
      {
        id: '0',
        userId: '0',
        message: 'Ola',
        sentAt: '0',
        seenAt: '0'
      },
      {
        id: '1',
        userId: '0',
        message: 'Ola',
        sentAt: '0',
        seenAt: '0'
      }
    ];
  }

  // --------------------------------- LIFECYCLE ---------------------------------

  ngOnInit() {
  }
}
