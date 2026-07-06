import { Component, inject, input } from '@angular/core';
import { WorkDay } from '../../models/workday';
import { WorkTimeService } from '../../services/work-time.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-time-input',
  imports: [MatInputModule,
    MatFormFieldModule],
  templateUrl: './time-input.html',
  styleUrl: './time-input.css',
})
export class TimeInput {
  label = input.required<string>();
  field = input.required<keyof WorkDay>();

  service = inject(WorkTimeService);


  value(){
    return this.service.workDay()[this.field()];
  }


  change(event:Event){

    const input = event.target as HTMLInputElement;

    this.service.update(
      this.field(),
      input.value
    );
  }

}
