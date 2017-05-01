import { User, Line, Result, Page, Comment, LineSend, Reply } from './../../module';
import { Http } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { $Storage } from '../../storage';

@Component({
    selector: 'app-line-detail',
    templateUrl: './line-detail.component.html',
    styleUrls: ['./line-detail.component.scss']
})
export class LineDetailComponent implements OnInit {
    context: string;
    replyContext: string;
    user: User = $Storage('user');
    id: number = 0;
    lineId: number = 0;
    lineSendId: number = 0;
    userId: number;
    userToId: number;
    commentId:number;
    line: Line = {};
    lineSend: LineSend = {};
    comment: Comment = {};
    commentList: Comment[] = [];
    page: any = {
        pageSize: 10
    };

    constructor(private route: ActivatedRoute, private router: Router, private http: Http) { }

    ngOnInit() {
        this.userId = this.user.id;

        this.route.queryParams.subscribe(data => {
            let body = { ...this.page };
            let lineId = +data.lineId;
            let id = +data.id;
            this.id = lineId || id;
            if (lineId != 0) {
                this.getSendOne(id);
                body.lineSendId = id;
            } else {
                this.getOne(id);
                body.lineId = id;
            }
            this.getCommentList(body);
        })
    }

    back() {
        this.router.navigate(['/line']);
    }

    delete(){
        this.http.post('/lineSend/delete.htm', {id:this.lineSendId}).subscribe((data: Result<any>) => {
            if (data.code == 200) {
                console.info(data)
            }
        })
    }

    publicReview() {
        let body = {
            context: this.comment.context,
            lineId: this.lineId,
            lineSendId: this.lineSendId,
        };
        this.http.post('/comment/insert.htm', body).subscribe((data: Result<Comment>) => {
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

    //评论回复
    addReply(){
        let body = {
            context:this.replyContext,
            lineId: this.id,
            lineSendId: this.lineSendId,
            userToId:this.userToId,
            commentId:this.commentId
        }
        this.http.post('/reply/insert.htm',body).subscribe( (data:Result<any>) => {
            if (data.code == 200) {
                console.info(data)
            }
        } )
        console.info(body);
    }

    watchReview(id,i){
        console.info(id);
        console.info(i)
        let body = {
            commentId:id,
            pageSize:20
        }
        this.http.post('/reply/findOfComPage.htm',body).subscribe( (data:Result<Page<Reply>>) => {
            if (data.code == 200) {
                console.info(data)
                this.commentList[i].replies = data.doc
            }
        } )
    }

    addPraisedComment(comment) {
        this.http.post('/comment/addPraised.htm', { id: comment.id, lineId: comment.lineId, lineSendId: comment.lineSendId }).subscribe((data: Result<any>) => {
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

    addPraisendReply(reply){
        this.http.post('/reply/addPraised.htm', { id: reply.id, lineId: reply.lineId, lineSendId: reply.lineSendId }).subscribe((data: Result<any>) => {
            if (data.code == 200) {
                if (data.doc) {
                    reply.isPraised = 0;
                    --reply.praised
                } else {
                    reply.isPraised = 1;
                    ++reply.praised
                }
            }
        })
    }
}
