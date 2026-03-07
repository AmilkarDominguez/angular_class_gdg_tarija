import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit, Signal,
  signal,
  SimpleChanges
} from '@angular/core';
import {Card} from '../card/card';
import {User} from '../../core/types/user';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [
    Card,
    FormsModule
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  name!: string;
  stack!: string;

  counter = signal(0);


  constructor() {
    console.log('List constructor');
  }

  ngOnInit() {
    console.log('List onInit');
  }


  ngAfterViewInit() {
    console.log('List AfterViewInit');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('List onChanges');
    console.log(changes)
  }

  ngOnDestroy() {
    console.log('List OnDestroy');
  }

  upCounter() {
    this.counter.update( value => value + 1);
  }

  add(): void {
    this.users.push(
      {
        name: this.name,
        stack: this.stack
      }
    )
  }

  edit(): void {
    this.users = this.users.filter(user => user.name !== this.name);
    this.add();
  }

  public users: User[] = [
    {
      name: 'Marcia Andrade',
      stack: 'Full Stack',
    },
    {
      name: 'David Camata',
      stack: 'BackEnd',
    },
    {
      name: 'Alex Flores',
      stack: 'FrontEnd',
    },
  ];


  handleSelect(user: User) {
    this.name = user.name;
    this.stack = user.stack;
  }

  handleDelete(name: string) {
    console.log(name, 'handleDelete');
    this.users = this.users.filter(user => user.name !== name);
  }
}
