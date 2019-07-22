import { Conversation as ServerConversation } from './../_server-models/conversation.model';
import { ChatInvoice } from './../_models/chat-invoice.model';
import { Injectable, EventEmitter } from '@angular/core';
import { ChatMessage, Parcel, ChatConversation, ChatAttachment, Proposal, AskFunds } from '../_models';
import { SocketService } from './socket.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ChatService {

  onNewMessage: EventEmitter<ChatMessage> = new EventEmitter();
  onNewConversation: EventEmitter<any> = new EventEmitter();

  constructor(
    private socket: SocketService,
    private auth: AuthenticationService
  ) {
    this.emitMessageEvents();
    this.emitNewConversationEvents();
  }

  sendMsg(conversation: ChatConversation, msg: ChatMessage) {
    this.socket.emit('message', {
      message: msg.message,
      room: conversation.id
    });
  }

  sendMsgRead(msg: ChatMessage) {
    this.socket.emit('message:read', {
      msg: msg.id
    });
  }

  sendAttachment(conversation: ChatConversation, msg: ChatMessage) {
    this.socket.emit('message:attachments', {
      files: msg.attachment.map((attach: ChatAttachment) => {
        return {
          file: attach.url,
          fileName: attach.fileName,
          fileSize: attach.fileSize,
          fileType: attach.fileType
        };
      }),
      message: msg.message,
      room: conversation.id
    });
  }

  sendParcel(conversation: ChatConversation, parcel: Parcel) {
    this.socket.emit('message:parcel', {
      title: parcel.sending,
      arrival: parcel.arrival_date,
      comments: parcel.additional_info,
      courier: parcel.courier_name,
      tracking: parcel.courier_track,
      parcelAttachments: parcel.package_list.map((attach) => {
        return {
          file: attach.url,
          fileName: attach.fileName,
          fileSize: attach.fileSize,
          fileType: attach.fileType
        };
      }),
      receiver: conversation.user.id,
      room: conversation.id,
    });
  }

  sendProposal(conversation: ChatConversation, proposal: Proposal) {
    this.socket.emit('message:proposal', {
      afterJob: proposal.paid_after_percentage,
      amountAfterJob: proposal.paid_after,
      amountBeforeJob: proposal.paid_before,
      beforeJob: proposal.paid_before_percentage,
      currency: proposal.currency,
      deliveryDate: proposal.delivery_date,
      deliveryProof: proposal.proof_of_completion,
      deliveryTerms: proposal.delivery_terms,
      proposalDetails: proposal.proposal_products.map((detail) => {
        return {
          name: detail.name,
          quantity: detail.quantity,
          price: detail.rate,
          total: detail.quantity * detail.rate
        };
      }),
      totalAmount: proposal.total_amount,
      payAmount: proposal.pay_amount,
      receiveAmount: proposal.final_amount,
      proposedServices: [],
      room: conversation.id,
      terms: proposal.user_to_user_agreement,
      vat: proposal.vat_percentage
    });
  }

  sendProposalChanged(conversation: ChatConversation, proposal: Proposal) {
    this.socket.emit('message:proposal:change', {
      data: {
        afterJob: proposal.paid_after_percentage,
        amountAfterJob: proposal.paid_after,
        amountBeforeJob: proposal.paid_before,
        beforeJob: proposal.paid_before_percentage,
        commission: proposal.commission,
        commissionRate: proposal.commission_rate,
        currency: proposal.currency,
        deliveryDate: proposal.delivery_date,
        deliveryProof: proposal.proof_of_completion,
        deliveryTerms: proposal.delivery_terms,
        proposalDetails: proposal.proposal_products.map((detail) => {
          return {
            id: detail.id,
            name: detail.name,
            quantity: detail.quantity,
            price: detail.rate,
            total: detail.quantity * detail.rate
          };
        }),
        totalAmount: proposal.total_amount,
        payAmount: proposal.pay_amount,
        receiveAmount: proposal.final_amount,
        proposalId: proposal.id,
        room: conversation.id,
        terms: proposal.user_to_user_agreement,
        vat: proposal.vat_percentage
      },
      room: conversation.id
    });
  }

  sendProposalBrandChanged(conversation: ChatConversation, proposal: Proposal) {
    this.socket.emit('message:proposal:edit', {
      data: {
        afterJob: proposal.paid_after_percentage,
        amountAfterJob: proposal.paid_after,
        amountBeforeJob: proposal.paid_before,
        beforeJob: proposal.paid_before_percentage,
        commission: proposal.commission,
        commissionRate: proposal.commission_rate,
        currency: proposal.currency,
        deliveryDate: proposal.delivery_date,
        deliveryProof: proposal.proof_of_completion,
        deliveryTerms: proposal.delivery_terms,
        proposalDetails: proposal.proposal_products.map((detail) => {
          return {
            id: detail.id,
            name: detail.name,
            quantity: detail.quantity,
            price: detail.rate,
            total: detail.quantity * detail.rate
          };
        }),
        totalAmount: proposal.total_amount,
        payAmount: proposal.pay_amount,
        receiveAmount: proposal.final_amount,
        proposalId: proposal.id,
        room: conversation.id,
        terms: proposal.user_to_user_agreement,
        vat: proposal.vat_percentage
      },
      room: conversation.id
    });
  }

  sendProposalAccepted(conversation: ChatConversation, proposal: Proposal) {
    this.socket.emit('message:proposal:accept', {
      id: proposal.id,
      receiver: conversation.user.id,
      room: conversation.id
    });
  }

  sendProposalDeclined(conversation: ChatConversation, proposal: Proposal) {
    this.socket.emit('message:proposal:decline', {
      id: proposal.id,
      room: conversation.id
    });
  }

  sendPayFunds(conversation: ChatConversation, invoice: ChatInvoice) {
    this.socket.emit('message:funds:pay', {
      offers: [invoice.id],
      room: conversation.id
    });
  }

  sendAskFunds(conversation: ChatConversation, askFunds: AskFunds, proposalId: number) {
    this.socket.emit('message:funds:request', {
      attachments: askFunds.attachments.map((attach: ChatAttachment) => {
        return {
          file: attach.url,
          fileName: attach.fileName,
          fileSize: attach.fileSize,
          fileType: attach.fileType
        };
      }),
      proposalId: proposalId,
      message: askFunds.additional_information,
      room: conversation.id
    });
  }

  sendReleaseFunds(conversation: ChatConversation, proposalId: number) {
    this.socket.emit('message:funds:release', {
      payments: [proposalId],
      room: +conversation.id
    });
  }

  private emitMessageEvents() {
    this.socket.on<ChatMessage>('message').subscribe((data) => {
      console.log(data);
      this.onNewMessage.next(data);
    });
  }

  private emitNewConversationEvents() {
    this.socket.on<any>('room:created').subscribe((data: ServerConversation) => {
      if (data.unread == 0 && data.chatRoom.chatParticipants.find(user => user.userId == this.auth.currentUserValue.id) != undefined) {
        this.onNewConversation.next(data);
      }
    });
  }

}
