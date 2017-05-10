import {AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Page} from "../module";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PagingComponent),
    multi: true
};

@Component({
    selector: 'app-paging',
    templateUrl: './paging.component.html',
    styleUrls: ['./paging.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class PagingComponent implements OnInit, ControlValueAccessor, OnChanges, AfterViewInit {

    ngAfterViewInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {
        console.info(changes)
    }

    writeValue(obj: Page<any>): void {
        obj && (this.page = obj);
        this.init();
    }

    registerOnChange(fn: any): void {
        this.pageOnChange = fn;
    }

    registerOnTouched(fn: any): void {

    }

    ngOnInit() {
        this.init();
    }

    constructor() {
    }

    private page: Page<any> = {
        totalPage: 0,
        pageIndex: 0
    };

    @Input() pageText: string = '...';
    @Input() pageShow: number = 3;
    pageList: PageData[];
    private goNum: number;

    @Output() goPage: EventEmitter<Page<any>> = new EventEmitter<Page<any>>();

    private pageOnChange: (value: any) => void = (value) => {
    };

    init() {
        this.pageList = this.getPageList(this.pageShow, this.page.totalPage, this.page.pageIndex);
    }

    go(event: any, input: HTMLInputElement) {
        let pageIndex = parseInt(event.target.getAttribute('data-number'));
        let type = parseInt(event.target.getAttribute('data-type'));
        if (isNaN(pageIndex) || isNaN(type)) return;

        switch (type) {
            case 1:
                if (this.page.pageIndex == 1) return;
                this.page.pageIndex += pageIndex;
                break;
            case 2:
                this.page.pageIndex = pageIndex;
                break;
            case 3:
                if (this.page.totalPage == this.page.pageIndex) return;
                this.page.pageIndex += pageIndex;
                break;
            case 4:
                if (pageIndex < 1 || pageIndex > this.page.totalPage) {
                    pageIndex = 1;
                    this.goNum = 1;
                }
                this.page.pageIndex = pageIndex;
                input.select();
                break;
        }
        this.pageOnChange(this.page);
        this.init();
        this.goPage.emit();
    }

    getPageList(n, tp, p) {
        let arr: PageData[] = [];
        let s = n * 2 + 5;
        if (tp >= s) {
            let _n = n;
            let _p = p;
            if (p - n - 2 < 1) {
                while (_p) {
                    arr.unshift({number: _p, type: 1});
                    --_p;
                }
                _p = p;
                while (++_p <= n * 2 + 3) {
                    arr.push({number: _p, type: 1});
                }
                arr.push({text: this.pageText, type: 0}, {number: tp, type: 1});
            } else if (p + n + 2 > tp) {
                while (_p <= tp) {
                    arr.push({number: _p, type: 1});
                    ++_p;
                }
                _p = p;
                while (--_p > tp - n * 2 - 3) {
                    arr.unshift({number: _p, type: 1});
                }
                arr.unshift({number: 1, type: 1}, {text: this.pageText, type: 0});
            } else {
                while (_n) {
                    arr.push({number: p - _n, type: 1});
                    --_n;
                }
                arr.push({number: p, type: 1});
                _n = n;
                let i = 1;
                while (i <= _n) {
                    arr.push({number: p + i, type: 1});
                    ++i;
                }
                arr.unshift({number: 1, type: 1}, {text: this.pageText, type: 0});
                arr.push({text: this.pageText, type: 0}, {number: tp, type: 1});
            }
        } else {
            while (tp) {
                arr.unshift({number: tp--, type: 1});
            }
        }
        return arr;
    }
}

export interface PageData {
    number?: number
    type?: number
    text?: string
}
