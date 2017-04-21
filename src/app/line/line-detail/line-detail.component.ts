import { User, Line, Result, Page, Comment, LineSend } from './../../module';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-line-detail',
    templateUrl: './line-detail.component.html',
    styleUrls: ['./line-detail.component.scss']
})
export class LineDetailComponent implements OnInit {
    user: User;
    lineId: number;
    userId: number;
    line: Line = {};
    lineSend: LineSend = {};
    comment: Comment = {};
    commentList: Comment[] = [];
    page: any = {
        pageSize: 10
    };

    constructor(private route: ActivatedRoute, private router: Router, private http: Http) { }

    ngOnInit() {
        let user = window.localStorage.getItem("user");
        if (user) {
            this.user = JSON.parse(user);
            this.userId = this.user.id;
        }
        this.route.params.subscribe((data) => {
            console.info(data);
            this.lineId = data.id;
            this.getOne(data.id);
            this.getCommentList(data.id);
        })
    }

    back() {
        this.router.navigate(['/line'])
    }

    publicReview() {
        this.comment.lineId = this.lineId;
        this.comment.userId = this.user.id;
        this.http.post('/comment/insert.htm', this.comment).subscribe((data: Result<Comment>) => {
            if (data.code == 200) {
                this.line.review++;
                this.comment = {};
            }
        })
    }

    /**
     * 获取line下面的评论
     * @param lineId
     */
    getCommentList(lineId) {
        this.http.post('/comment/findPage.htm', { lineId: lineId, ...this.page }).subscribe((data: Result<Page<Comment>>) => {
            console.info(data)
            if (data.code == 200) {
                this.commentList = data.doc.list
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

    addPraised(id) {
        this.http.post('/line/addPraised.htm', { id: id }).subscribe((data: Result<any>) => {
            if (data.code == 200) {
                if (data.doc) {
                    this.line.isPraised = 0;
                    --this.line.praised
                } else {
                    this.line.isPraised = 1;
                    ++this.line.praised
                }
            }
        })
    }

    //分享
    addForward(lineId) {
        this.lineSend.lineId = lineId
        this.http.post('/lineSend/insert.htm', this.lineSend).subscribe((data: Result<any>) => {
            if (data.code == 200) {

            }
            console.info(data);
        })
    }

    addPraisedComment(comment) {
        this.http.post('/comment/addPraised.htm', { id: comment.id, userId: this.userId }).subscribe((data: Result<any>) => {
            if (data.code == 200) {
                if (data.doc) {
                    comment.isPraised = 0;
                    --comment.praised
                } else {
                    comment.isPraised = 1;
                    ++comment.praised
                }
            }
        })
    }

    addForwardComment(comment) {
        this.http.post('/comment/addForward.htm', { id: comment.id, userId: this.userId }).subscribe((data: Result<any>) => {
            if (data.code == 200) {
                if (data.doc) {
                    comment.isForward = 0;
                    --comment.forward
                } else {
                    comment.isForward = 1;
                    ++comment.forward
                }
            }
        })
    }
}
