import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { fadeInOut } from '../../../animations/fade-in-out';

@Component({
    selector: 'app-home2',
    templateUrl: './home2.component.html',
    styleUrls: ['./home2.component.scss'],
    animations: [fadeInOut]
})
export class Home2Component implements OnInit, OnChanges {
    _inputText: String;
    constructor() { }

    @Input() get inputText(): String{
        return this._inputText;
    }

    set inputText(val:String){
        console.info(val);
        this._inputText = val;
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.info(changes)
    }

}
