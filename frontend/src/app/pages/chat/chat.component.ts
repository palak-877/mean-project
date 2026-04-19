import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  question = '';
  messages: any[] = [];
  history: any[] = [];

  conversationId: string | null = null;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/']);
    }

    this.loadHistory();
  }


  scrollToBottom() {
  setTimeout(() => {
    this.scrollContainer.nativeElement.scrollTop =
      this.scrollContainer.nativeElement.scrollHeight;
  }, 100);
}
  // 🔹 send question
  sendMessage() {
  if (!this.question.trim()) return;

  this.api.sendMessage({
    question: this.question,
    conversationId: this.conversationId
  }).subscribe((res: any) => {

    this.messages.push({
      question: this.question,
      answer: res.answer
    });

    // ✅ save conversation id
    this.conversationId = res.conversationId;
    this.scrollToBottom();
    this.question = '';
    this.loadHistory();
  });
}

  // 🔹 load history from DB
  loadHistory() {
    this.api.getConversations().subscribe((res: any) => {
      console.log("HISTORY:", res);
      this.history = res;
    });
  }

  // 🔹 click history item
  openChat(item: any) {
    this.messages = item.messages;
    this.conversationId = item._id;
  }

  newChat() {
  this.messages = [];
  this.conversationId = null;
}

  // 🔹 logout
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  
}