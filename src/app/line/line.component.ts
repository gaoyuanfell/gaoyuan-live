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
    lineList: Array<Line> = [];

    constructor(private http: Http, private router:Router) { }

    ngOnInit() {
        this.getUserList();
        this.getLineList();
    }

    go(id){
        this.router.navigate(['/line',id])
    }

    getUserList(){
        this.http.post('http://localhost:8082/user/findList.htm', {}).subscribe((data: Result<User>) => {
            if (data.code == 200) {
                this.userList = data.doc
            }
        })
    }

    getLineList(){
        this.http.post('http://localhost:8082/line/findPage.htm', {}).subscribe((data: Result<Line>) => {
            if (data.code == 200) {
                this.lineList = data.doc;
            }
        })
    }

    addLineSubmit() {
        this.http.post('http://localhost:8082/line/insert.htm', this.line).subscribe((data: Result<Line>) => {
            if(data.code == 200){
                this.line.id = data.doc.id
                this.lineList.push(this.line);
                this.line = {};
            }
            console.info(data)
        })
    }

}
