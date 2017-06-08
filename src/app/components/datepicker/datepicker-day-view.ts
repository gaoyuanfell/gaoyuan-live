import {Component, Input} from '@angular/core';
import {NgmDateStruct} from './ngm-date-struct';

@Component({
    selector: '[ngbDatepickerDayView]',
    styleUrls:['./datepicker-day-view.less'],
    host: {
        '[class.bg-primary]': 'selected',
        '[class.text-white]': 'selected',
        '[class.text-muted]': 'isMuted()',
        '[class.outside]': 'isMuted()',
        '[class.btn-secondary]': '!disabled'
    },
    template: `{{ date.day }}`
})
export class NgbDatepickerDayView {
    @Input() currentMonth: number;
    @Input() date: NgmDateStruct;
    @Input() disabled: boolean;
    @Input() selected: boolean;

    isMuted() { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); }
}
