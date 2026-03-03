import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {User} from '../../core/types/user';

@Component({
  selector: 'app-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {

  @Input()
  user!: User;

  @Output()
  notify: EventEmitter<User>;

  @Output()
  eventStack: EventEmitter<string>;

  constructor(){
    this.notify = new EventEmitter<User>();
    this.eventStack = new EventEmitter<string>();
  }

  selected(user: User) {
    this.notify.emit(user);
  }

  selectStack(stack: string){
    this.eventStack.emit(stack);
  }
}
