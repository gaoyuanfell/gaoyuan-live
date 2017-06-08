import {Component, OnInit} from '@angular/core';
import {Page} from "../model";
import {AlertService} from "../directives/alert/alert.service";

@Component({
    selector: 'app-index2',
    templateUrl: './index2.component.html',
    styleUrls: ['./index2.component.less'],
})
export class Index2Component implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    modal:any = {
        ok:function () {
            console.info('ok')
        }
    };

    modal1:any = {
        no:function () {
            console.info('no')
        }
    };
    modal2:any = {
        no:function () {
            console.info('no')
        }
    };

    modal3:any = {
        no:function () {
            console.info('no')
        }
    };

    modal4:any = {
        no:function () {
            console.info('no')
        }
    };

    model7 = { year: 2017, month: 9, day: 7 };

    page: Page<any> = {
        totalPage: 120,
        pageIndex: 10,
    };

    go() {
    }

    add(){
        this.page.pageIndex += 1;
    }

    navigate(e){

    }

    search(e){
        // console.info(e);
        e.target.blur();
    }
}
