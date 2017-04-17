import { Http } from '@angular/http';
import { Component, Renderer } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private renderer:Renderer,private http:Http){
        renderer.listenGlobal('window','load',(event:Event) => {
            // this.http.post("http://localhost:8082/user/findPage.htm",{}).subscribe( (data) => {
            //     console.info(data);
            // } )
        })
    }
    search:any;
    test:Date = new Date();
    date:Number = Date.now();
    currentHero:any = {};
    isActive(e){
        console.info(e)
    }
 }
