import {Component, OnInit, Renderer2} from '@angular/core';
import {fadeInLOutR} from '../animations/fade-in-l-out-r'
import {Line, Page} from "./model";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [fadeInLOutR],
    providers: []
})
export class AppComponent implements OnInit {
    page: Page<any> = {
        totalPage: 120,
        pageIndex: 10,
    }

    constructor(private renderer: Renderer2) {
        renderer.listen('window', 'load', (event: Event) => {

        })
    }

    ngOnInit(): void {
        // console.info($('body'));
        // console.info(Tether)
    }

    go(){}

}
