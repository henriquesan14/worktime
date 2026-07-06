import { Component, signal } from '@angular/core';
import { TimeInput } from './components/time-input/time-input';
import { SummaryCard } from './components/summary-card/summary-card';

@Component({
  selector: 'app-root',
  imports: [TimeInput, SummaryCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
