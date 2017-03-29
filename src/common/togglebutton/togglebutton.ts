import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms/src/directives';
import { Component, EventEmitter, forwardRef, Input, NgModule, OnChanges, Output, SimpleChanges } from '@angular/core';

const TOGGLEBUTTON_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleButton),
    multi: true
}

@Component({
    selector: 'app-togglebutton',
    styleUrls: ['./togglebutton.css'],
    templateUrl: './togglebutton.html',
    providers: [TOGGLEBUTTON_VALUE_ACCESSOR]
})
class ToggleButton implements ControlValueAccessor, OnChanges {

    @Input() onLabel: string = '1';

    @Input() offLabel: string = '0';

    @Input() onIcon: string;

    @Input() offIcon: string;

    @Input() disabled: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    checked: boolean = false;

    onModelChange: Function = () => { };

    onModelTouched: Function = () => { };

    public hover: boolean;

    toggle(event: Event) {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onModelChange(this.checked);
            this.onModelTouched();
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            })
        }
    }

    writeValue(value: any): void {
        this.checked = value;
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.info(changes)
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [ToggleButton],
    declarations: [ToggleButton]
})
export class ToggleButtonModule { }