import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
    constructor(private renderer: Renderer2) {
        renderer.listen('window', 'load', (event: Event) => {

        })
    }

    ngOnInit(): void {

    }

}
