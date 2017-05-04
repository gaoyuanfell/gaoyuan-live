import { Component, Renderer } from '@angular/core';
import { fadeInLOutR } from '../animations/fade-in-l-out-r'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [fadeInLOutR]
})
export class AppComponent {
    constructor(private renderer: Renderer) {
        renderer.listenGlobal('window', 'load', (event: Event) => {

        })
    }
    search: any;
    test: Date = new Date();
    date: Number = Date.now();
    currentHero: any = {};
    isActive(e) {
        console.info(e);
    }
}
