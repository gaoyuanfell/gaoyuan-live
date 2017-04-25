import { User, Line, Result, Page, Comment, LineSend } from './../../module';
import { Http } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';

@Component({
    selector: 'app-line-detail',
    templateUrl: './line-detail.component.html',
    styleUrls: ['./line-detail.component.scss']
})
export class LineDetailComponent implements OnInit {
    context: string;
    user: User;
    id: number = 0;
    lineId: number = 0;
    lineSendId: number = 0;
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
        // this.route.data.subscribe(data => {
        //     console.info(data);
        // })
        this.route.queryParams.subscribe(data => {
            console.info(data)
            let body = { ...this.page };
            let lineId = +data.lineId;
            let id = +data.id;
            this.id = lineId || id;
            if (lineId != 0) {
                this.getSendOne(id);
                body.lineSendId = lineId;
            } else {
                this.getOne(id);
                body.lineId = id;
            }
            this.getCommentList(body);
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
     * @param body
     */
    getCommentList(body) {
        this.http.post('/comment/findPage.htm', body).subscribe((data: Result<Page<Comment>>) => {
            if (data.code == 200) {
                this.commentList = data.doc.list;
            }
        })
    }

    getOne(id) {//lineId
        this.http.post('/line/findOneOfUser.htm', { id: id }).subscribe((data: Result<Line>) => {
            if (data.code == 200) {
                this.line = data.doc;
                this.lineId = id;
            }
        })
    }

    getSendOne(id) {//lineSendId
        this.http.post('/lineSend/findOneOfUser.htm', { id: id }).subscribe((data: Result<LineSend>) => {
            if (data.code == 200) {
                this.lineSend = data.doc;
                this.line = data.doc.line;
                this.lineSendId = id;
            }
        })
    }

    addPraised(id) {
        this.http.post('/line/addPraised.htm', { id: id }).subscribe((data: Result<any>) => {
            if (data.code == 200) {
                if (data.doc) {
                    this.line.isPraised = 0;
                    --this.line.praised;
                } else {
                    this.line.isPraised = 1;
                    ++this.line.praised;
                }
            }
        })
    }

    addPraisedSendLine(id) {
        this.http.post('/lineSend/addPraised.htm', { id: id }).subscribe((data: Result<any>) => {
            if (data.code == 200) {
                if (data.doc) {
                    this.lineSend.isPraised = 0;
                    --this.lineSend.praised
                } else {
                    this.lineSend.isPraised = 1;
                    ++this.lineSend.praised
                }
            }
        })
    }

    //分享
    addForward() {
        let body = {
            context: this.context,
            lineId: this.id,
            sort: this.lineSend.sort || 0,
            lineSendId: this.lineSendId,
        };
        this.http.post('/lineSend/insert.htm', body).subscribe((data: Result<any>) => {
            if (data.code == 200) {

            }
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
}
