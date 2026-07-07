import { Component, inject, signal } from '@angular/core';
import { TimeInput } from './components/time-input/time-input';
import { SummaryCard } from './components/summary-card/summary-card';
import { WorkTimeService } from './services/work-time.service';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [TimeInput, SummaryCard, MatIcon, MatButton],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    service = inject(WorkTimeService);
}
