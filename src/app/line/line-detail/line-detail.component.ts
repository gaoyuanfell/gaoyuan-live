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

    constructor(private route: ActivatedRoute,private router:Router,private http: Http) { }

    ngOnInit() {
        this.route.params.subscribe((data) => {
            console.info(data)
            this.getOne(data.id);
        })
    }

    back(){
        this.router.navigate(['/line'])
    }

    getOne(id){
        this.http.post('http://localhost:8082/line/findOne.htm',{id:id}).subscribe( (data:Result) => {
            if(data.code == 200){
                this.line = data.doc;
            }
        } )
    }

}
