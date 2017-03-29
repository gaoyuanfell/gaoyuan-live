import { Component, Renderer } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private renderer:Renderer){
        renderer.listenGlobal('window','load',(event:Event) => {
            
        })
    }
 }
