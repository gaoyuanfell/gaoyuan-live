import {Component, Input, TemplateRef, Output, EventEmitter} from '@angular/core';
import {NgmDate} from './ngm-date';
import {NgmDatepickerI18n} from './datepicker-i18n';
import {DayTemplateContext} from './datepicker-day-template-context';
import {DayViewModel, WeekViewModel} from './datepicker-view-model';

export interface MonthViewModel {
    firstDate: NgmDate,
    number: number,
    year: number,
    weeks: WeekViewModel[],
    weekdays: number[],
}

@Component({
    selector: 'ngb-datepicker-month-view',
    host: {'class': 'd-block'},
    styleUrls: ['./datepicker-month-view.less'],
    templateUrl: './datepicker-month-view.html',
})
export class NgmDatepickerMonthView {
    @Input() dayTemplate: TemplateRef<DayTemplateContext>;
    @Input() disabled: boolean;
    @Input() month: MonthViewModel;
    @Input() outsideDays: 'visible' | 'hidden' | 'collapsed';
    @Input() selectedDate: NgmDate;
    @Input() showWeekdays;
    @Input() showWeekNumbers;

    @Output() select = new EventEmitter<NgmDate>();

    constructor(public i18n: NgmDatepickerI18n) {
    }

    doSelect(day: DayViewModel) {
        if (!this.isDisabled(day) && !this.isHidden(day)) {
            this.select.emit(NgmDate.from(day.date));
        }
    }

    isDisabled(day: DayViewModel) {
        return this.disabled || day.disabled;
    }

    isSelected(date: NgmDate) {
        return this.selectedDate && this.selectedDate.equals(date);
    }

    isCollapsed(week: WeekViewModel) {
        return this.outsideDays === 'collapsed' && week.days[0].date.month !== this.month.number && week.days[week.days.length - 1].date.month !== this.month.number;
    }

    isHidden(day: DayViewModel) {
        return (this.outsideDays === 'hidden' || this.outsideDays === 'collapsed') && this.month.number !== day.date.month;
    }
}
