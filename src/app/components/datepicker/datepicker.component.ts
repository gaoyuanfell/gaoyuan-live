import {Component, Input, OnChanges, TemplateRef, forwardRef, OnInit, SimpleChanges, EventEmitter, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {NgmCalendar} from './ngm-calendar';
import {NgmDate} from './ngm-date';
import {NgmDatepickerService} from './datepicker-service';
import {MonthViewModel, NavigationEvent} from './datepicker-view-model';
import {toInteger} from '../../util/util';
import {DayTemplateContext} from './datepicker-day-template-context';
import {NgmDatepickerConfig} from './datepicker-config';
import {NgmDateStruct} from './ngm-date-struct';
import {NgmDatepickerI18n} from './datepicker-i18n';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
};

export interface NgmDatepickerNavigateEvent {
    /**
     * Currently displayed month
     */
    current: { year: number, month: number };

    /**
     * Month we're navigating to
     */
    next: { year: number, month: number };
}

@Component({
    selector: 'ngm-datepicker',
    exportAs: "ngmDatepicker",
    host: {'class': 'd-inline-block rounded'},
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, NgmDatepickerService],
})
export class DatepickerComponent implements OnChanges, OnInit, ControlValueAccessor {
    _date: NgmDate;
    _maxDate: NgmDate;
    _minDate: NgmDate;

    model: NgmDate;
    months: MonthViewModel[] = [];

    /**
     * Reference for the custom template for the day display
     */
    @Input() dayTemplate: TemplateRef<DayTemplateContext>;

    /**
     * Number of months to display
     */
    @Input() displayMonths: number;

    /**
     * First day of the week. With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun
     */
    @Input() firstDayOfWeek: number;

    /**
     * Callback to mark a given date as disabled.
     * 'Current' contains the month that will be displayed in the view
     */
    @Input() markDisabled: (date: NgmDateStruct, current: { year: number, month: number }) => boolean;

    /**
     * Min date for the navigation. If not provided will be 10 years before today or `startDate`
     */
    @Input() minDate: NgmDateStruct;

    /**
     * Max date for the navigation. If not provided will be 10 years from today or `startDate`
     */
    @Input() maxDate: NgmDateStruct;

    /**
     * Navigation type: `select` (default with select boxes for month and year), `arrows`
     * (without select boxes, only navigation arrows) or `none` (no navigation at all)
     */
    @Input() navigation: 'select' | 'arrows' | 'none';

    /**
     * The way to display days that don't belong to current month: `visible` (default),
     * `hidden` (not displayed) or `collapsed` (not displayed with empty space collapsed)
     */
    @Input() outsideDays: 'visible' | 'collapsed' | 'hidden';

    /**
     * Whether to display days of the week
     */
    @Input() showWeekdays: boolean;

    /**
     * Whether to display week numbers
     */
    @Input() showWeekNumbers: boolean;

    /**
     * Date to open calendar with.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided, calendar will open with current month.
     * Use 'navigateTo(date)' as an alternative
     */
    @Input() startDate: { year: number, month: number };

    /**
     * An event fired when navigation happens and currently displayed month changes.
     * See NgmDatepickerNavigateEvent for the payload info.
     */
    @Output() navigate = new EventEmitter<NgmDatepickerNavigateEvent>();

    disabled = false;

    onChange = (_: any) => {
    };
    onTouched = () => {
    };

    constructor(private _service: NgmDatepickerService, private _calendar: NgmCalendar, public i18n: NgmDatepickerI18n, config: NgmDatepickerConfig) {
        this.dayTemplate = config.dayTemplate;
        this.displayMonths = config.displayMonths;
        this.firstDayOfWeek = config.firstDayOfWeek;
        this.markDisabled = config.markDisabled;
        this.minDate = config.minDate;
        this.maxDate = config.maxDate;
        this.navigation = config.navigation;
        this.outsideDays = config.outsideDays;
        this.showWeekdays = config.showWeekdays;
        this.showWeekNumbers = config.showWeekNumbers;
        this.startDate = config.startDate;
    }

    getHeaderHeight() {
        const h = this.showWeekdays ? 6.25 : 4.25;
        return this.displayMonths === 1 || this.navigation !== 'select' ? h - 2 : h;
    }

    getHeaderMargin() {
        const m = this.showWeekdays ? 2 : 0;
        return this.displayMonths !== 1 || this.navigation !== 'select' ? m + 2 : m;
    }

    /**
     * Navigates current view to provided date.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     * Use 'startDate' input as an alternative
     */
    navigateTo(date?: { year: number, month: number }) {
        this._setViewWithinLimits(this._service.toValidDate(date));
        this._updateData();
    }

    ngOnInit() {
        this._setDates();
        this.navigateTo(this._date);
    }

    ngOnChanges(changes: SimpleChanges) {
        this._setDates();
        this._setViewWithinLimits(this._date);

        if (changes['displayMonths']) {
            this.displayMonths = toInteger(this.displayMonths);
        }

        // we have to force rebuild all months only if any of these inputs changes
        if (['startDate', 'minDate', 'maxDate', 'navigation', 'firstDayOfWeek', 'markDisabled', 'displayMonths'].some(
                input => !!changes[input])) {
            this._updateData(true);
        }
    }

    onDateSelect(date: NgmDate) {
        this._setViewWithinLimits(date);

        this.onTouched();
        this.writeValue(date);
        this.onChange({year: date.year, month: date.month, day: date.day});

        // switch current month
        if (this._date.month !== this.months[0].number && this.displayMonths === 1) {
            this._updateData();
        }
    }

    onNavigateDateSelect(date: NgmDate) {
        this._setViewWithinLimits(date);
        this._updateData();
    }

    onNavigateEvent(event: NavigationEvent) {
        switch (event) {
            case NavigationEvent.PREV:
                this._setViewWithinLimits(this._calendar.getPrev(this.months[0].firstDate, 'm'));
                break;
            case NavigationEvent.NEXT:
                this._setViewWithinLimits(this._calendar.getNext(this.months[0].firstDate, 'm'));
                break;
        }
        this._updateData();
    }

    registerOnChange(fn: (value: any) => any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => any): void {
        this.onTouched = fn;
    }

    writeValue(value) {
        if(value) { this.navigateTo(this._service.toValidDate(value, null)) }
        this.model = this._service.toValidDate(value, null);
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    private _setDates() {
        this._maxDate = NgmDate.from(this.maxDate);
        this._minDate = NgmDate.from(this.minDate);
        this._date = this._service.toValidDate(this.startDate);

        if (!this._calendar.isValid(this._minDate)) {
            this._minDate = this._calendar.getPrev(this._date, 'y', 10);
            this.minDate = {year: this._minDate.year, month: this._minDate.month, day: this._minDate.day};
        }

        if (!this._calendar.isValid(this._maxDate)) {
            this._maxDate = this._calendar.getNext(this._date, 'y', 11);
            this._maxDate = this._calendar.getPrev(this._maxDate);
            this.maxDate = {year: this._maxDate.year, month: this._maxDate.month, day: this._maxDate.day};
        }

        if (this._minDate && this._maxDate && this._maxDate.before(this._minDate)) {
            throw new Error(`'maxDate' ${this._maxDate} should be greater than 'minDate' ${this._minDate}`);
        }
    }

    private _setViewWithinLimits(date: NgmDate) {
        if (this._minDate && date.before(this._minDate)) {
            this._date = new NgmDate(this._minDate.year, this._minDate.month, 1);
        } else if (this._maxDate && date.after(this._maxDate)) {
            this._date = new NgmDate(this._maxDate.year, this._maxDate.month, 1);
        } else {
            this._date = new NgmDate(date.year, date.month, 1);
        }
    }

    private _updateData(force = false) {
        const newMonths = [];
        for (let i = 0; i < this.displayMonths; i++) {
            const newDate = this._calendar.getNext(this._date, 'm', i);
            const index = this.months.findIndex(month => month.firstDate.equals(newDate));

            if (force || index === -1) {
                let s: MonthViewModel = this._service.generateMonthViewModel(newDate, this._minDate, this._maxDate, toInteger(this.firstDayOfWeek), this.markDisabled);
                newMonths.push(s);
            } else {
                newMonths.push(this.months[index]);
            }
        }

        const newDate = newMonths[0].firstDate;
        const oldDate = this.months[0] ? this.months[0].firstDate : null;

        this.months = newMonths;

        // emitting navigation event if the first month changes
        if (!newDate.equals(oldDate)) {
            this.navigate.emit({
                current: oldDate ? {year: oldDate.year, month: oldDate.month} : null,
                next: {year: newDate.year, month: newDate.month}
            });
        }
    }
}
