import {Component, OnInit} from '@angular/core';
import {Page} from "../model";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    page: Page<any> = {
        totalPage: 120,
        pageIndex: 10,
    };

    go(){}

}
