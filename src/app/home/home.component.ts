import { Component, OnInit } from '@angular/core';
import { fadeInOut } from '../../animations/fade-in-out';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [fadeInOut]
})
export class HomeComponent implements OnInit {
    constructor() { }

    ngOnInit() {
    }

}
