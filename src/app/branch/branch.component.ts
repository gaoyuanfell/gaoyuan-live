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
    tmpUrlList:string[] = [];
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
                this.branchList = data.doc.list;
            }
        })
    }

    getOne(id) {
        this.http.post('/line/findOneOfUser.htm', { id: id }).subscribe((data: Result<Line>) => {
            if (data.code == 200) {
                this.line = data.doc;
            }
        })
    }

    upload(f) {
        let files = f.files;
        this.tmpUrlList.length = 0;
        let formData = new FormData();
        for (let file of files) {
            formData.append('file', file, file.name);
            var a = new FileReader();
            a.onload = (e:any) => {
                this.tmpUrlList.push(e.target.result)
            };
            a.readAsDataURL(file);
        }
        this.http.post('/upload/uploadPhoto.htm', formData).subscribe((data: Result<Array<string>>) => {
            if (data.code == 200) {
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
