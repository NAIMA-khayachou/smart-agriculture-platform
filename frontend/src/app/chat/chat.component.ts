import { Component, signal, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule, Send, Bot, User } from 'lucide-angular';
import { ChatService } from '../services/chat.services';

interface Message {
  role   : 'user' | 'assistant';
  content: string;
}

@Component({
  selector   : 'app-chat',
  standalone : true,
  imports    : [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './chat.component.html',
  styleUrls  : ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  readonly Send = Send;
  readonly Bot  = Bot;
  readonly User = User;

  @ViewChild('messagesEnd') messagesEnd!: ElementRef;

  classId    = signal<string>('');
  sessionId  = signal<string>(crypto.randomUUID());  // session unique
  messages   = signal<Message[]>([]);
  question   = signal<string>('');
  loading    = signal<boolean>(false);

  constructor(
    private route      : ActivatedRoute,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.classId.set(this.route.snapshot.queryParams['class_id'] ?? '');

    // Message de bienvenue
    this.messages.set([{
      role   : 'assistant',
      content: `🌱 Bonjour ! Je suis votre expert agronome. 
Je suis là pour répondre à toutes vos questions sur l’agriculture :
maladies des plantes, prévention, traitements et conseils pratiques.

  👉 Comment puis-je vous aider aujourd’hui ?`
    }]);
  }

  sendMessage() {
    const q = this.question().trim();
    if (!q || this.loading()) return;

    // Ajouter le message utilisateur
    this.messages.update(msgs => [...msgs, { role: 'user', content: q }]);
    this.question.set('');
    this.loading.set(true);

    // Appel API
    this.chatService.chat(this.sessionId(), q).subscribe({
      next: (data) => {
        this.messages.update(msgs => [
          ...msgs,
          { role: 'assistant', content: data.answer }
        ]);
        this.loading.set(false);
        this.scrollToBottom();
      },
      error: () => {
        this.messages.update(msgs => [
          ...msgs,
          { role: 'assistant', content: 'Une erreur est survenue. Réessayez.' }
        ]);
        this.loading.set(false);
      }
    });

    this.scrollToBottom();
  }

  onEnter(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  }

  private scrollToBottom() {
    setTimeout(() => {
      this.messagesEnd?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}