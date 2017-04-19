import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Result } from './../result';
import { User } from '../user/user';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Line } from './line';

@Component({
    selector: 'app-line',
    templateUrl: './line.component.html',
    styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {
    line: Line = {

    };
    userList: Array<User> = [];

    constructor(private http: Http, private router:Router) { }

    ngOnInit() {
        this.http.post('http://localhost:8082/user/findList.htm', {}).subscribe((data: Result) => {
            if (data.code == 200) {
                this.userList = data.doc;
            }
        })
    }

    go(){
        this.router.navigate(['/line',1])
    }

    addLineSubmit() {
        this.http.post('http://localhost:8082/line/insert.htm', this.line).subscribe((data: Result) => {
            console.info(data)
        })
    }

    addPraised(){
        this.http.post('http://localhost:8082/line/addPraised.htm', {}).subscribe((data: Result) => {
            console.info(data)
        })
    }

    addRepeat(){
        this.http.post('http://localhost:8082/line/addRepeat.htm', {}).subscribe((data: Result) => {
            console.info(data)
        })
    }

    addForward(){
        this.http.post('http://localhost:8082/line/addForward.htm', {}).subscribe((data: Result) => {
            console.info(data)
        })
    }
}
