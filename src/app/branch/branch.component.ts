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
    lineId: number = 0;
    branch: Branch = {};
    constructor(private route: ActivatedRoute, private router: Router, private http: Http) { }

    ngOnInit() {
        this.route.params.subscribe((data) => {
            console.info(data)
            this.lineId = data.lineId
            this.getBranchList(data.lineId);
            this.getOne(data.lineId);
        })
    }

    getBranchList(lineId) {
        this.http.post('/branch/findPage.htm', { lineId: lineId }).subscribe((data: Result<Page<Branch>>) => {
            if (data.code == 200) {
                this.branchList = data.doc.list;//.map( (m) => {m.urls = m.url.split(","); return m; } );
                console.info(this.branchList);
            }
        })
    }

    getOne(id) {//lineId
        this.http.post('/line/findOneOfUser.htm', { id: id }).subscribe((data: Result<Line>) => {
            if (data.code == 200) {
                this.line = data.doc;
            }
        })
    }

    upload(f) {
        let files = f.files;
        let formData = new FormData();
        for (let file of files) {
            formData.append('file', file, file.name);
        }
        this.http.post('/upload/uploadPhoto.htm', formData).subscribe((data: Result<Array<string>>) => {
            if (data.code == 200) {
                console.info(data);
                this.branch.url = data.doc.join(",");
            }
        })
    }

    branchSubmit() {
        let body = {
            ...this.branch,
            lineId: this.lineId
        }
        this.http.post('/branch/insert.htm', body).subscribe((data: Result<any>) => {
            if (data.code == 200) {
                console.info(data);
            }
        })
    }

}
