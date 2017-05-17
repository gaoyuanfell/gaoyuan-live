import {Injectable} from '@angular/core';

// const WEEKDAYS_SHORT = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
// const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// const MONTHS_FULL = [
//     'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
//     'December'
// ];

const WEEKDAYS_SHORT = ['一', '二', '三', '四', '五', '六', '日'];
const MONTHS_SHORT = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
const MONTHS_FULL = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];


/**
 * Type of the service supplying month and weekday names to to NgbDatepicker component.
 * See the i18n demo for how to extend this class and define a custom provider for i18n.
 */
@Injectable()
export abstract class NgmDatepickerI18n {
    /**
     * Returns the short weekday name to display in the heading of the month view.
     * With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun
     */
    abstract getWeekdayShortName(weekday: number): string;

    /**
     * Returns the short month name to display in the date picker navigation.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec
     */
    abstract getMonthShortName(month: number): string;

    /**
     * Returns the full month name to display in the date picker navigation.
     * With default calendar we use ISO 8601: 'month' is 1=January ... 12=December
     */
    abstract getMonthFullName(month: number): string;
}

@Injectable()
export class NgmDatepickerI18nDefault extends NgmDatepickerI18n {
    getWeekdayShortName(weekday: number): string {
        return WEEKDAYS_SHORT[weekday - 1];
    }

    getMonthShortName(month: number): string {
        return MONTHS_SHORT[month - 1];
    }

    getMonthFullName(month: number): string {
        return MONTHS_FULL[month - 1];
    }
}
