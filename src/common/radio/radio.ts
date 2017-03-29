import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms/src/directives';
import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    Output,
    ViewChild
} from '@angular/core';

const RADIO_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButton),
  multi: true
};

@Component({
    selector:'app-radio',
    templateUrl:'./radio.html',
    styleUrls:['./radio.css'],
    providers:[RADIO_VALUE_ACCESSOR]
})
class RadioButton  implements ControlValueAccessor,AfterViewInit{

    @Input() value: any;

    @Input() name: string;

    @Input() disabled: boolean;
    
    @Input() label: string;

    @Output() onClick: EventEmitter<any> = new EventEmitter();
    
    @ViewChild('rb') inputViewChild: ElementRef;
    
    public input: HTMLInputElement;
        
    public onModelChange: Function = () => {};
    
    public onModelTouched: Function = () => {};
    
    public checked: boolean;
    
    public hover: boolean;
    
    public focused: boolean;
    
    ngAfterViewInit() {
        this.input = <HTMLInputElement> this.inputViewChild.nativeElement;
    }

    handleClick() {
        if(!this.disabled) {
            this.onClick.emit(null);
            this.select();
        }
    }
    
    select() {
        if(!this.disabled) {
            this.input.checked = true;
            this.checked = true;
            this.onModelChange(this.value);
        }
    }
            
    writeValue(value: any) : void {
        this.checked = (value == this.value);
        
        if(this.input) {
            this.input.checked = this.checked;
        }
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
    
    onFocus(event) {
        this.focused = true;
    }

    onBlur(event) {
        this.focused = false;
        this.onModelTouched();
    }
    
    onChange(event) {
        this.select();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [RadioButton],
    declarations: [RadioButton]
})
export class RadioButtonModule { }