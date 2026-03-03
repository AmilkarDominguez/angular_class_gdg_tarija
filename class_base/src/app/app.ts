import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Card } from './components/card/card';
import {List} from './components/list/list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, List],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('class_base');
}
