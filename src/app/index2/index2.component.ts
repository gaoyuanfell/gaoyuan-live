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
        totalPage: 15,
        pageIndex: 10
    };

    constructor() {
    }

    ngOnInit() {
    }

}
