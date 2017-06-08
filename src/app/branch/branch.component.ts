import {CommentService} from './../../service/comment.service';
import {UploadService} from './../../service/upload.service';
import {BranchService} from './../../service/branch.service';
import {LineService} from './../../service/line.service';
import {Http} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {Branch, Line, Result, Page} from '../model';

@Component({
    selector: 'app-branch',
    templateUrl: './branch.component.html',
    styleUrls: ['./branch.component.less'],
    providers: [LineService, BranchService, UploadService, CommentService]
})
export class BranchComponent implements OnInit {
    branchList: Branch[] = [];
    line: Line = {};
    lineId: number = 0;
    branch: Branch = {};
    _branch: Branch = {};
    branchId: number = 0;
    context: string;
    tmpUrlList: string[] = [];

    constructor(private route: ActivatedRoute, private router: Router, private lineService: LineService, private branchService: BranchService, private uploadService: UploadService, private commentService: CommentService) {
    }

    ngOnInit() {
        this.route.params.subscribe((data) => {
            console.info(data)
            this.lineId = data.lineId
            this.getBranchList(data.lineId);
            this.getOne(data.lineId);
        })
    }

    getBranchList(lineId) {
        this.branchService.branchPageOfLine({lineId: lineId, pageSize: 20}).subscribe((data: Result<Page<Branch>>) => {
            if (data.code == 200) {
                this.branchList = data.doc.list;
            }
        })
    }

    getOne(id) {
        this.lineService.lineOfUser({id: id}).subscribe((data: Result<Line>) => {
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
            a.onload = (e: any) => {
                this.tmpUrlList.push(e.target.result)
            };
            a.readAsDataURL(file);
        }
        this.uploadService.uploadPhoto(formData).subscribe((data: Result<Array<string>>) => {
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
        this.branchService.insert(body).subscribe((data: Result<any>) => {
            if (data.code == 200) {
                console.info(data);
            }
        })
    }

    addPraised(branch) {
        this.branchService.addPraised({id: branch.id}).subscribe((data: Result<any>) => {
            if (data.code == 200) {
                if (data.doc) {
                    branch.isPraised = 0;
                    --branch.praised
                } else {
                    branch.isPraised = 1;
                    ++branch.praised
                }
            }
        })
    }


    publicReview() {
        let body = {
            context: this.context,
            type: 3,
            branchId: this._branch.id,
            lineId: this.lineId
        };
        this.commentService.insert(body).subscribe((data: Result<any>) => {
            if (data.code == 200) {
                this._branch.review++;
                this.context = "";
            }
        })
    }

    getCommentList(branch: Branch) {
        let body = {
            branchId: branch.id,
            type: 3
        }
        this.commentService.commentPageOfType(body).subscribe((data: Result<Page<Comment>>) => {
            if (data.code == 200) {
                branch.comments = data.doc.list;
                console.info(data);
            }
        })
    }

    addPraisedComment(comment) {
        this.commentService.addPraised({id: comment.id, lineId: comment.lineId, branchId: comment.branchId}).subscribe((data: Result<any>) => {
            if (data.code == 200) {
                if (data.doc) {
                    comment.isPraised = 0;
                    --comment.praised;
                } else {
                    comment.isPraised = 1;
                    ++comment.praised;
                }
            }
        })
    }

}
