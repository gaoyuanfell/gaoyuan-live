import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
};

@Component({
    selector: 'app-datepicker',
    exportAs:"appDatepicker",
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class DatepickerComponent implements OnInit,ControlValueAccessor {
    writeValue(obj: any): void {
        console.info(obj);
    }

    registerOnChange(fn: any): void {

    }

    registerOnTouched(fn: any): void {

    }

    constructor() {
    }

    ngOnInit() {
    }

}
