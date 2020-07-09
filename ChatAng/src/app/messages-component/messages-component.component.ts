import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, } from '@angular/core';
import {ChatInterfaceService} from '../chat-interface.service';
import { ChatResponse } from '../chat-response';
import {ChatInterface} from '../chat-interface';
import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-messages-component',
  templateUrl: './messages-component.component.html',
  styleUrls: ['./messages-component.component.sass']
})



export class MessagesComponentComponent implements OnInit, AfterViewChecked  {
@ViewChild('scrollMe') private myScrollContainer: ElementRef;
messages: ChatInterface[] = []
messageText: string
Counter : number = 0

  constructor(private botService: ChatInterfaceService) { }

  ngOnInit(): void {
    this.scrollToBottom(); 
  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 

scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

  sendMessage(message: string){
    let msg = this.messageText;
this.messageText = "";
    this.messages.push({timestamp: new Date(), Message: msg, UserIsHuman: true});
    this.TalkToBot(msg);
    this.Counter++;
  }

  TalkToBot(message) {
    this.botService.Talk(message).subscribe((data: ChatResponse) => { this.messages.push({timestamp: new Date(), Message: data.response, UserIsHuman: false})});
  }
  
}
