import {Injectable, TemplateRef} from '@angular/core';
import {DayTemplateContext} from './datepicker-day-template-context';
import {NgmDateStruct} from './ngm-date-struct';

/**
 * Configuration service for the NgbDatepicker component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepickers used in the application.
 */
@Injectable()
export class NgmDatepickerConfig {
    dayTemplate: TemplateRef<DayTemplateContext>;
    displayMonths = 1;
    firstDayOfWeek = 1;
    markDisabled: (date: NgmDateStruct, current: { year: number, month: number }) => boolean;
    minDate: NgmDateStruct;
    maxDate: NgmDateStruct;
    navigation: 'select' | 'arrows' | 'none' = 'select';
    outsideDays: 'visible' | 'collapsed' | 'hidden' = 'visible';
    showWeekdays = true;
    showWeekNumbers = false;
    startDate: { year: number, month: number };
    endDate: { year: number, month: number };
    compare:boolean;
}
