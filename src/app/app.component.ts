import {Component, OnInit, Renderer2} from '@angular/core';
import {fadeInLOutR} from '../animations/fade-in-l-out-r'
import {Line, Page} from "./module";
import {LineService} from "../service/line.service";
import {UserService} from "../service/user.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [fadeInLOutR],
    providers: [LineService, UserService]
})
export class AppComponent implements OnInit {
    page: Page<any> = {
        pageSize: 10
    }
    lineList: Line[] = [];

    constructor(private renderer: Renderer2, private lineService: LineService) {
        renderer.listen('window', 'load', (event: Event) => {

        })
    }

    ngOnInit(): void {

    }


}
