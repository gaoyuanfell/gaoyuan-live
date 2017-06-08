import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NavigationEvent} from './datepicker-view-model';
import {NgmDate} from './ngm-date';
import {NgmDatepickerI18n} from './datepicker-i18n';
import {NgmCalendar} from './ngm-calendar';

@Component({
    selector: 'ngb-datepicker-navigation',
    host: {'class': 'd-flex justify-content-between', '[class.collapsed]': '!showSelect'},
    styleUrls:['./datepicker-navigation.less'],
    templateUrl:'./datepicker-navigation.html',
})
export class NgmDatepickerNavigation {
    navigation = NavigationEvent;

    @Input() date: NgmDate;
    @Input() disabled: boolean;
    @Input() maxDate: NgmDate;
    @Input() minDate: NgmDate;
    @Input() months: number;
    @Input() showSelect: boolean;
    @Input() showWeekNumbers: boolean;

    @Output() navigate = new EventEmitter<NavigationEvent>();
    @Output() select = new EventEmitter<NgmDate>();

    constructor(public i18n: NgmDatepickerI18n, private _calendar: NgmCalendar) {}

    doNavigate(event: NavigationEvent) { this.navigate.emit(event); }

    nextDisabled() {
        return this.disabled || (this.maxDate && this._calendar.getNext(this.date, 'm').after(this.maxDate));
    }

    prevDisabled() {
        const prevDate = this._calendar.getPrev(this.date, 'm');
        return this.disabled || (this.minDate && prevDate.year <= this.minDate.year && prevDate.month < this.minDate.month);
    }

    selectDate(date: NgmDate) { this.select.emit(date); }
}
