import { SessionUser } from './session_user';
import { ChatMessage } from './chat_message';

export class ChatRoom {
  id: string;
  user: SessionUser;
  messages: ChatMessage[];
}
