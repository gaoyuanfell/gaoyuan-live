import { Line } from './../line';
import { Result } from '../../result';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-line-detail',
    templateUrl: './line-detail.component.html',
    styleUrls: ['./line-detail.component.scss']
})
export class LineDetailComponent implements OnInit {

    line:Line = {};

    num : any;

    constructor(private route: ActivatedRoute,private router:Router,private http: Http) { }

    ngOnInit() {
        this.route.params.subscribe((data) => {
            console.info(data)
            this.getOne(data.id);
        })

        // this.num = setInterval( () => { this.addPraised(1) },100 )
    }

    // stop(){
    //     clearInterval(this.num);
    // }

    back(){
        this.router.navigate(['/line'])
    }

    getOne(id){
        this.http.post('http://localhost:8082/line/findOne.htm',{id:id}).subscribe( (data:Result<Line>) => {
            if(data.code == 200){
                this.line = data.doc;
            }
        } )
    }

    addPraised(id){
        this.http.post('http://localhost:8082/line/addPraised.htm', {id:id}).subscribe((data: Result<any>) => {
            console.info(data)
            if(data.code == 200){
                ++this.line.praised
            }
        })
    }

    addRepeat(id){
        this.http.post('http://localhost:8082/line/addRepeat.htm', {id:id}).subscribe((data: Result<any>) => {
            console.info(data)
            if(data.code == 200){
                ++this.line.repeat;
            }
        })
    }

    addForward(id){
        this.http.post('http://localhost:8082/line/addForward.htm', {id:id}).subscribe((data: Result<any>) => {
            console.info(data)
            if(data.code == 200){
                ++this.line.forward
            }
        })
    }

}
