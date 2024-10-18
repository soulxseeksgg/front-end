import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ChatService } from '../../services/chat.service';
import { IChatMessage } from '../../interfaces/i-chat-message';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{

  private stompClient: any;
  private ENDPOINT ='http://localhost:8080/socket';
  private CHANNEL ='/topic/chat';
  

  isConnected = false;
  isSubscribed: boolean = false;

  messages: IChatMessage[] = [];

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

    this.stompClient.connect({}, function() {
      console.log("WebSocket connected");
      that.isConnected = true;
      that.subscribeToGlobalChat();

    }, function(error: any) {
        console.log("Connection error: " + error);
    });
  }  


  private subscribeToGlobalChat() {

    this.stompClient.subscribe(this.CHANNEL, (message: any) => {
      console.log("Subscribed to channel: " + this.CHANNEL);
      let newMessage = JSON.parse(message.body) as IChatMessage; 
      this.messages.push(newMessage);
      console.log("message call back:"+JSON.stringify(this.messages) );

    }, (error: any) => {
      console.log("Subscription error: " + error);
    });
  }



  onSubmit(){
    let message = this.chatFormGroup.controls.message.value;
    this.chatService.postMessage(message).subscribe((response) => {
      console.log("send message:"+message)  
    }, (error) => {
      console.log("error: "+error);
    })
  }

    

}



