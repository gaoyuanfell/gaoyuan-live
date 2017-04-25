import { User, Line, Result, Page } from './../module';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-line',
    templateUrl: './line.component.html',
    styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {
    line: Line = {};
    userList: User[] = [];
    lineList: Line[] = [];
    page: any = {
        pageSize: 10
    };

    constructor(private http: Http, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.getUserList();
        this.getLineList();
    }

    go(id, lineId) {
        // console.info(lineId)
        this.router.navigate(['/line', id], { queryParams: { lineId: lineId, id: id } })
    }

    getUserList() {
        this.http.post('/user/findList.htm', {}).subscribe((data: Result<User[]>) => {
            if (data.code == 200) {
                this.userList = data.doc;
            }
        })
    }

    getLineList() {
        this.http.post('/line/findPage.htm', {...this.page}).subscribe((data: Result<Page<Line>>) => {
            if (data.code == 200) {
                this.lineList = data.doc.list;
            }
        })
    }

    addLineSubmit() {
        this.http.post('/line/insert.htm', this.line).subscribe((data: Result<Line>) => {
            if (data.code == 200) {
                this.line.id = data.doc.id
                this.lineList.push(this.line);
                this.line = {};
            }
            // console.info(data)
        })
    }

}
