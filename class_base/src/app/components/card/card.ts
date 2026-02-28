import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'gdg-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {


  condicion:boolean = true;
  alto: number = 10;
  color: string = 'red';

}
