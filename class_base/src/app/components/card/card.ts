import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {User} from '../../core/types/user';

@Component({
  selector: 'app-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card implements OnInit, OnDestroy, OnChanges {

  @Input()
  user!: User;

  @Output()
  eventSelect: EventEmitter<User>;

  @Output()
  eventDelete: EventEmitter<string>;

  ngOnInit() {
    console.log('card ngOnInit');
  }

  ngOnDestroy() {
    console.log('card OnDestroy');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('card ngOnChanges');
    console.log(changes);
  }

  constructor(){
    this.eventSelect = new EventEmitter<User>();
    this.eventDelete = new EventEmitter<string>();
  }

  selected(user: User) {
    this.eventSelect.emit(user);
  }

  delete(name: string){
    this.eventDelete.emit(name);
  }
}
