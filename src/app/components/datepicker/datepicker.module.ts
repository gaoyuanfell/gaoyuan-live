import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatepickerComponent, NgmDatepickerNavigateEvent} from './datepicker.component';
import {NgmDatepickerMonthView} from './datepicker-month-view';
import {NgmDatepickerNavigation} from './datepicker-navigation';
import {NgmInputDatepicker} from './datepicker-input';
import {FormsModule} from '@angular/forms';
import {NgbDatepickerDayView} from './datepicker-day-view';
import {NgmDatepickerI18n, NgmDatepickerI18nDefault} from './datepicker-i18n';
import {NgmCalendar, NgmCalendarGregorian} from './ngm-calendar';
// import {NgbCalendarIslamicCivil} from './hijri/ngb-calendar-islamic-civil';
import {NgmDateParserFormatter, NgmDateISOParserFormatter} from './ngm-date-parser-formatter';
import {NgmDatepickerNavigationSelect} from './datepicker-navigation-select';
import {NgmDatepickerConfig} from './datepicker-config';

export {DatepickerComponent, NgmDatepickerNavigateEvent} from './datepicker.component';
export {NgmInputDatepicker} from './datepicker-input';
export {NgmCalendar} from './ngm-calendar';
// export {NgbCalendarIslamicCivil} from './hijri/ngb-calendar-islamic-civil';
export {NgmDatepickerMonthView} from './datepicker-month-view';
export {NgbDatepickerDayView} from './datepicker-day-view';
export {NgmDatepickerNavigation} from './datepicker-navigation';
export {NgmDatepickerNavigationSelect} from './datepicker-navigation-select';
export {NgmDatepickerConfig} from './datepicker-config';
export {NgmDatepickerI18n} from './datepicker-i18n';
export {NgmDateStruct} from './ngm-date-struct';
export {NgmDateParserFormatter} from './ngm-date-parser-formatter';

@NgModule({
    declarations: [
        DatepickerComponent, NgmDatepickerMonthView, NgmDatepickerNavigation, NgmDatepickerNavigationSelect, NgbDatepickerDayView,
        NgmInputDatepicker
    ],
    exports: [DatepickerComponent, NgmInputDatepicker],
    imports: [CommonModule, FormsModule],
    entryComponents: [DatepickerComponent]
})
export class DatepickerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DatepickerModule,
            providers: [
                {provide: NgmCalendar, useClass: NgmCalendarGregorian},
                {provide: NgmDatepickerI18n, useClass: NgmDatepickerI18nDefault},
                {provide: NgmDateParserFormatter, useClass: NgmDateISOParserFormatter}, NgmDatepickerConfig
            ]
        };
    }
}
