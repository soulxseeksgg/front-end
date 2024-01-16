import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import SockJS, * as SockJs from 'sockjs-client'
import * as Stomp from 'stompjs'
import { ChatService } from '../../services/chat.service';
import { IChatMessages } from '../../interfaces/i-chat-messages';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{

  private stompClient: any;
  private CHANNEL ='/topic/chat';
  private ENDPOINT ='http://localhost:8080/socket';

  isConnected = false;

  messages: IChatMessages[] = [];
  
  chatFormGroup: FormGroup = new FormGroup({
      message: new FormControl('',Validators.required)
    });

  constructor(
    private chatService: ChatService
  ){}  
  
  ngOnInit():void {
    this.connectWebSocket();
  }  

  private connectWebSocket(){
    let ws = new SockJS(this.ENDPOINT);
    this.stompClient = Stomp.over(ws);

    let that = this
    this.stompClient.connect({},function(){
      that.isConnected = true;
      that.subscribeToGlobalChat();
    });
  }  

  private subscribeToGlobalChat(){
    this.stompClient.subscribe(this.CHANNEL, (message: any) =>{
      
      let newMessage = JSON.parse(message.body) as IChatMessages
      this.messages.push(newMessage);
    });
  }

  onSubmit(){
    let message = this.chatFormGroup.controls.message.value;

    this.chatService.postMessage(message).subscribe((response) => {
      
    }, (error) => {
      console.log("error: "+error);
    })
  }

}


