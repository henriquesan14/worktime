import { Injectable, signal } from '@angular/core';
import { WorkDay } from '../models/workday';

@Injectable({
  providedIn: 'root'
})
export class WorkTimeService {

  private readonly targetMinutes = 8 * 60 + 48;

  workDay = signal<WorkDay>({
    entry: null,
    lunchOut: null,
    lunchIn: null,
    exit: null
  });


  constructor() {
    const saved = localStorage.getItem('workDay');

    if (saved) {
      this.workDay.set(JSON.parse(saved));
    }
  }


  update(field: keyof WorkDay, value: string) {

    this.workDay.update(day => {

      const updated = {
        ...day,
        [field]: value
      };

      localStorage.setItem(
        'workDay',
        JSON.stringify(updated)
      );

      return updated;
    });
  }


  getWorkedMinutes(): number {

    const day = this.workDay();

    let total = 0;

    if(day.entry && day.lunchOut)
      total += this.diff(day.entry, day.lunchOut);


    if(day.lunchIn && day.exit)
      total += this.diff(day.lunchIn, day.exit);


    return total;
  }


  getRemainingMinutes(): number {

    return Math.max(
      this.targetMinutes - this.getWorkedMinutes(),
      0
    );
  }


  getExpectedExit(): string | null {

    const day = this.workDay();

    if(!day.entry)
      return null;


    const lunch = 
      day.lunchOut && day.lunchIn
      ? this.diff(day.lunchOut, day.lunchIn)
      : 60;


    const minutes =
      this.timeToMinutes(day.entry)
      + this.targetMinutes
      + lunch;


    return this.minutesToTime(minutes);
  }

  getOvertimeMinutes(): number {
    return this.getWorkedMinutes() - this.targetMinutes;
  }

  clear() {
    const emptyDay = {
      entry: null,
      lunchOut: null,
      lunchIn: null,
      exit: null
    };

    this.workDay.set(emptyDay);

    localStorage.removeItem('workDay');
  }


  private diff(start:string, end:string){

    return this.timeToMinutes(end)
      - this.timeToMinutes(start);
  }


  private timeToMinutes(time:string){

    const [h,m] = time.split(':').map(Number);

    return h * 60 + m;
  }


  private minutesToTime(minutes:number){

    const h = Math.floor(minutes / 60) % 24;
    const m = minutes % 60;

    return `${h.toString().padStart(2,'0')}:${m
      .toString()
      .padStart(2,'0')}`;
  }


  formatMinutes(minutes:number){

    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    return `${h}h ${m.toString().padStart(2,'0')}min`;
  }
  
  formatOvertime(minutes:number){
    const sign = minutes >= 0 ? '+' : '-';
    const value = Math.abs(minutes);
    const hours = Math.floor(value / 60);
    const mins = value % 60;

    return `${sign}${hours}h ${mins
      .toString()
      .padStart(2,'0')}min`;
  }

}
