import {Component} from '@angular/core';

interface User {
  name: string;
  email: string;
  description: string;
}

@Component({
  selector: 'gdg-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {

  public fullname: string;
  public label: string;
  public inputType: string;
  public user: User;

  private name: string;
  private lastname: string;

  constructor() {
    this.name = 'Amilkar';
    this.lastname = 'Dominguez';
    this.fullname = `${this.name} ${this.lastname}`;
    this.label = 'Ver mas info ℹ️'

    this.user = {
      name: 'Amilkar',
      email: 'amilkar@email.com',
      description: 'Dev',
    };


    this.inputType = 'text';
  }

  public sendMessage() {
    console.log('Enviando mensaje...');
  }

  public sum(num: number): number {
    console.log(num + 1)
    return num + 1;
  }

  public showPassword(): void {
    this.inputType = 'text';
  }

  public hidePassword(): void {
    this.inputType = 'password';
  }

  public obtenerLabel():string {
    return this.label;
  }
}
