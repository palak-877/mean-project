import { Component, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent {

  question = '';
  messages: any[] = [];

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private api: ApiService, private router: Router) {}

  // ✅ Send message to backend
  send() {
  if (!this.question.trim()) return;

  this.api.sendMessage({ question: this.question })
    .subscribe((res: any) => {

      this.messages.push({
        question: this.question,
        answer: res.answer
      });

      this.question = '';

      // ✅ Auto scroll
      setTimeout(() => {
        this.scrollContainer.nativeElement.scrollTop =
          this.scrollContainer.nativeElement.scrollHeight;
      }, 100);
    });
}

  // ✅ Logout function
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/']);
  }
}