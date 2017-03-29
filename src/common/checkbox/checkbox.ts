import { Component, Input, NgModule, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NgModel } from '@angular/forms/src/directives';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const CHECKBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Checkbox),
  multi: true
};

@Component({
    selector:'app-checkbox',
    templateUrl:'./checkbox.html',
    styleUrls:['./checkbox.css'],
    providers:[CHECKBOX_VALUE_ACCESSOR]
})
class Checkbox implements ControlValueAccessor{
    
    @Input() value: any;

    @Input() name: string;

    @Input() disabled: boolean;
    
    @Input() binary: string;
    
    @Input() label: string;
    
    @Output() onChange: EventEmitter<any> = new EventEmitter();

    model: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    hover: boolean;
    
    focused: boolean = false;
    
    checked: boolean = false;

    onClick(event,checkbox,focus:boolean) {
        event.preventDefault();
        
        if(this.disabled) {
            return;
        }
        
        this.checked = !this.checked;
        this.updateModel();
        
        if(focus) {
            checkbox.focus();
        }
    }
    
    updateModel() {
        if(!this.binary) {
            if(this.checked)
                this.addValue(this.value);
            else
                this.removeValue(this.value);

            this.onModelChange(this.model);
        }
        else {
            this.onModelChange(this.checked);
        }
        
        this.onChange.emit(this.checked);
    }
    
    handleChange(event) {
        this.checked = event.target.checked;
        this.updateModel();
    }

    isChecked(): boolean {
        if(!this.binary)
            return this.findValueIndex(this.value) !== -1;
        else
            return this.model;
    }

    removeValue(value) {
        let index = this.findValueIndex(value);
        if(index >= 0) {
            this.model.splice(index, 1);
        }
    }

    addValue(value) {
        this.model.push(value);
    }
    
    onFocus(event) {
        this.focused = true;
    }

    onBlur(event) {
        this.focused = false;
        this.onModelTouched();
    }

    findValueIndex(value) {
        let index: number = -1;
        if(this.model) {
            for (let i = 0; i < this.model.length; i++) {
                if(this.model[i] == value) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }
    
    writeValue(model: any) : void {
        this.model = model;
        this.checked = this.isChecked();
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
}

@NgModule({
    imports: [CommonModule],
    exports: [Checkbox],
    declarations: [Checkbox]
})
export class CheckboxModule {  }