import {Component, OnInit} from '@angular/core';
import {Page} from "../module";
import {PagingComponent} from "../paging/paging.component";

@Component({
    selector: 'app-index2',
    templateUrl: './index2.component.html',
    styleUrls: ['./index2.component.scss'],
    viewProviders: [PagingComponent]
})
export class Index2Component implements OnInit {

    page: Page<any> = {
        totalPage: 120,
        pageIndex: 10
    };

    go(){
    }

    constructor() {
    }

    ngOnInit() {
    }

}
