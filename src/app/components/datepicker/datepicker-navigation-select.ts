import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {NgmDate} from './ngm-date';
import {toInteger} from '../../util/util';
import {NgmDatepickerI18n} from './datepicker-i18n';
import {NgmCalendar} from './ngm-calendar';

@Component({
    selector: 'ngb-datepicker-navigation-select',
    styles: [`
        select {
            /* to align with btn-sm */
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
            line-height: 1.25;
            /* to cancel the custom height set by custom-select */
            height: inherit;
            width: 50%;
        }
    `],
    templateUrl:'./datepicker-navigation-select.html',
})
export class NgmDatepickerNavigationSelect implements OnChanges {
    months: number[];
    years: number[] = [];

    @Input() date: NgmDate;
    @Input() disabled: boolean;
    @Input() maxDate: NgmDate;
    @Input() minDate: NgmDate;

    @Output() select = new EventEmitter<NgmDate>();

    constructor(public i18n: NgmDatepickerI18n, private calendar: NgmCalendar) { this.months = calendar.getMonths(); }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['maxDate'] || changes['minDate'] || changes['date']) {
            this._generateYears();
            this._generateMonths();
        }
    }

    changeMonth(month: string) { this.select.emit(new NgmDate(this.date.year, toInteger(month), 1)); }

    changeYear(year: string) { this.select.emit(new NgmDate(toInteger(year), this.date.month, 1)); }

    private _generateMonths() {
        this.months = this.calendar.getMonths();

        if (this.date && this.date.year === this.minDate.year) {
            const index = this.months.findIndex(month => month === this.minDate.month);
            this.months = this.months.slice(index);
        }

        if (this.date && this.date.year === this.maxDate.year) {
            const index = this.months.findIndex(month => month === this.maxDate.month);
            this.months = this.months.slice(0, index + 1);
        }
    }

    private _generateYears() {
        this.years = Array.from({length: this.maxDate.year - this.minDate.year + 1}, (e, i) => this.minDate.year + i);
    }
}
