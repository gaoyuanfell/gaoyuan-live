import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

    imgs:string[] = ['assets/img/1.jpg','assets/img/5.jpg','assets/img/6.jpg','assets/img/7.jpg']

    constructor() {
    }

    ngOnInit() {
    }

}
