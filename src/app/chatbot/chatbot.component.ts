import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {

  ngOnInit(){
    this.closeForm();
    this.loadResponse();
    this.loadMessages();
  }
  
  messageList: Array<{ text: string, sender: string }> = [];
  messages = [
    { text: 'Welcome to Lamar Online Banking.', sender: 'receiver'}
  ];

  loadMessages(){
    this.messages.forEach(m => {
      this.messageList.push(m);
    });
  }

  responseMap = new Map();

  loadResponse(){
    this.responseMap.set("Hello","Hello! How can I assist you today?");
    this.responseMap.set("Hi","Hi there! What can I do for you?");
    this.responseMap.set("Hey","Hey, how can I help you?");
    this.responseMap.set("issue","Restarting your device often resolves this issue.");
    this.responseMap.set("Bye","Bye for now! Have a great day.");
  }

  openForm(): void {
    const myForm = document.getElementById("myForm") as HTMLElement;
    if (myForm) {
      myForm.style.display = "block";
    }
  }
  
  closeForm(): void {
    const myForm = document.getElementById("myForm") as HTMLElement;
    if (myForm) {
      myForm.style.display = "none";
    }
  }

  msg :string = "";
  msgFlag : boolean = true;
  @ViewChild('sendButton', { static: true })
  sendButton!: ElementRef;

  send(){
    this.messageList.push({ text: this.msg, sender: 'user'});
    this.messageList.push({ text: this.responseMap.get(this.msg), sender: 'receiver'});
    this.msg = "";
    if(this.messageList[this.messageList.length - 1].sender == 'user'){
      this.msgFlag = false;
    }else{
      this.msgFlag = true;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendButton.nativeElement.click();
    }
  }
}