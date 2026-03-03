import { Component } from '@angular/core';
import {Card} from '../card/card';
import {User} from '../../core/types/user';

@Component({
  selector: 'app-list',
  imports: [
    Card
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {

  public users: User[] = [
    {
      name:'Marcia Andrade',
      stack: 'Full Stack',
    },
    {
      name:'David Camata',
      stack: 'BackEnd',
    },
    {
      name:'Alex Flores',
      stack: 'FrontEnd',
    },
  ];


  public selectedStacks: string[] = [];

  handleStack(stack: string){
    this.selectedStacks.push(stack);
  }

  handleNotify(user: User) {
    console.info(user);
  }
}
