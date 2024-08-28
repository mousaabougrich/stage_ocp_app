// @ts-ignore
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getSaturdayAndSundayDates(): { saturday: Date, sunday: Date } {
    const today = new Date();
    const dayOfWeek = today.getDay();
    let daysUntilSaturday = 6 - dayOfWeek; // Saturday is 6th day of the week
    let daysUntilSunday = 7 - dayOfWeek;   // Sunday is 7th day of the week

    if (dayOfWeek === 6) {
      // If today is Saturday, get this Saturday and next Sunday
      daysUntilSaturday = 0;
      daysUntilSunday = 1;
    } else if (dayOfWeek === 0) {
      // If today is Sunday, get this Saturday and this Sunday
      daysUntilSaturday = -1; // Go back to the previous Saturday
      daysUntilSunday = 0;
    }

    const saturday = new Date(today);
    saturday.setDate(today.getDate() + daysUntilSaturday);

    const sunday = new Date(today);
    sunday.setDate(today.getDate() + daysUntilSunday);

    return { saturday, sunday };
  }
}
