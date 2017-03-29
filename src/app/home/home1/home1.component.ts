import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeInOut } from '../../../animations/fade-in-out';

@Component({
    selector: 'app-home1',
    templateUrl: './home1.component.html',
    styleUrls: ['./home1.component.scss'],
    animations: [fadeInOut]
})
export class Home1Component implements OnInit, OnDestroy {

    constructor() { }

    ngOnInit() {
        console.info('ngOnInit')
    }

    ngOnDestroy(): void {
        console.info('OnDestroy')
    }

    animationDone(e) {
        console.info(e)
    }
    animationStarted(e) {
        console.info('start')
        console.info(e)
    }

}
