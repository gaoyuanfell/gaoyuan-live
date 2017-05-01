import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Branch, Line, Result, Page } from './../module';

@Component({
    selector: 'app-branch',
    templateUrl: './branch.component.html',
    styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
    branchList: Branch[] = [];
    line: Line = {};
    branch: Branch = {};
    constructor(private route: ActivatedRoute, private router: Router, private http: Http) { }

    ngOnInit() {
        this.route.params.subscribe((data) => {
            console.info(data)
            this.getBranchList(data.lineId);
            this.getOne(data.lineId);
        })
    }

    getBranchList(lineId) {

    }

    getOne(id) {//lineId
        this.http.post('/line/findOneOfUser.htm', { id: id }).subscribe((data: Result<Line>) => {
            if (data.code == 200) {
                this.line = data.doc;
            }
        })
    }

}
