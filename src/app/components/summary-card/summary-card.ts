import { Component, inject } from '@angular/core';
import { WorkTimeService } from '../../services/work-time.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-summary-card',
  imports: [MatCardModule],
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.css',
})
export class SummaryCard {
  service = inject(WorkTimeService);
}
