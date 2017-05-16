import {NgmCalendar} from './ngm-calendar';
import {NgmDate} from './ngm-date';
import {MonthViewModel, DayViewModel} from './datepicker-view-model';
import {Injectable} from '@angular/core';

@Injectable()
export class NgmDatepickerService {
    constructor(private _calendar: NgmCalendar) {
    }

    generateMonthViewModel(date: NgmDate, minDate: NgmDate, maxDate: NgmDate, firstDayOfWeek: number, markDisabled: (date: NgmDate, current: { month: number, year: number }) => boolean): MonthViewModel {
        const month: MonthViewModel = {firstDate: null, number: date.month, year: date.year, weeks: [], weekdays: []};

        date = this._getFirstViewDate(date, firstDayOfWeek);

        // month has weeks
        for (let w = 0; w < this._calendar.getWeeksPerMonth(); w++) {
            const days: DayViewModel[] = [];

            // week has days
            for (let d = 0; d < this._calendar.getDaysPerWeek(); d++) {
                if (w === 0) {
                    month.weekdays.push(this._calendar.getWeekday(date));
                }

                const newDate = new NgmDate(date.year, date.month, date.day);

                let disabled = (minDate && newDate.before(minDate)) || (maxDate && newDate.after(maxDate));
                if (!disabled && markDisabled) {
                    disabled = markDisabled(newDate, {month: month.number, year: month.year});
                }

                // saving first date of the month
                if (month.firstDate === null && date.month === month.number) {
                    month.firstDate = newDate;
                }

                days.push({date: newDate, disabled: disabled});

                date = this._calendar.getNext(date);
            }
            month.weeks.push({number: this._calendar.getWeekNumber(days.map(day => NgmDate.from(day.date)), firstDayOfWeek), days: days});
        }
        return month;
    }

    toValidDate(date: { year: number, month: number, day?: number }, defaultValue?: NgmDate): NgmDate {
        const ngmDate = NgmDate.from(date);
        if (defaultValue === undefined) {
            defaultValue = this._calendar.getToday();
        }
        return this._calendar.isValid(ngmDate) ? ngmDate : defaultValue;
    }

    private _getFirstViewDate(date: NgmDate, firstDayOfWeek: number): NgmDate {
        const currentMonth = date.month;
        let today = new NgmDate(date.year, date.month, date.day);
        let yesterday = this._calendar.getPrev(today);

        const firstDayOfCurrentMonthIsAlsoFirstDayOfWeek = () => {
            return today.month !== yesterday.month && firstDayOfWeek === this._calendar.getWeekday(today);
        };

        const reachedTheFirstDayOfTheLastWeekOfPreviousMonth = () => {
            return today.month !== currentMonth && firstDayOfWeek === this._calendar.getWeekday(today);
        };

        // going back in time
        while (!reachedTheFirstDayOfTheLastWeekOfPreviousMonth() && !firstDayOfCurrentMonthIsAlsoFirstDayOfWeek()) {
            today = new NgmDate(yesterday.year, yesterday.month, yesterday.day);
            yesterday = this._calendar.getPrev(yesterday);
        }

        return today;
    }
}
