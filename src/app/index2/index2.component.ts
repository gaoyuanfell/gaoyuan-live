import {Component, OnInit} from '@angular/core';
import {Page} from "../model";

@Component({
    selector: 'app-index2',
    templateUrl: './index2.component.html',
    styleUrls: ['./index2.component.scss'],
})
export class Index2Component implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    modal:any = {a:1};

    page: Page<any> = {
        totalPage: 120,
        pageIndex: 10,
    };

    go() {
    }

    add(){
        this.page.pageIndex += 1;
    }
}
