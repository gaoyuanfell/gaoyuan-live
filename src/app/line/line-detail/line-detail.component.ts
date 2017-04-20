import { Page } from './../../result';
import { User } from './../../user/module';
import { Line, Comment } from './../module';
import { Result } from '../../result';
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
    comment: Comment = {};
    commentList: Comment[] = [];

    constructor(private route: ActivatedRoute, private router: Router, private http: Http) { }

    ngOnInit() {
        this.route.params.subscribe((data) => {
            console.info(data)
            this.lineId = data.id;
            this.getOne(data.id);
            this.getCommentList(data.id);
        })
        let user = window.localStorage.getItem("user");
        if (user) {
            this.user = JSON.parse(user);
            this.userId = this.user.id;
        }
        this.getComment(1)
    }

    back() {
        this.router.navigate(['/line'])
    }

    publicReview() {
        this.comment.lineId = this.lineId;
        this.comment.userId = this.user.id;
        this.http.post('/comment/insert.htm', this.comment).subscribe((data: Result<Comment>) => {
            console.info(data);
            if (data.code == 200) {
                this.line.review++;
                this.comment = {};
            }
        })
    }

    getComment(id) {
        this.http.post('/comment/findOne.htm', { id: id }).subscribe((data: Result<Page<Comment>>) => {
            if (data.code == 200) {
                console.info(data);
            }
        })
    }

    /**
     * 获取line下面的评论
     * @param id
     */
    getCommentList(id) {
        this.http.post('/comment/findPage.htm', { lineId: id }).subscribe((data: Result<Page<Comment>>) => {
            if (data.code == 200) {
                this.commentList = data.doc.list
            }
        })
    }

    getOne(id) {
        this.http.post('/line/findOne.htm', { id: id }).subscribe((data: Result<Line>) => {
            if (data.code == 200) {
                this.line = data.doc;
            }
        })
    }

    addPraised(id) {
        this.http.post('/line/addPraised.htm', { id: id }).subscribe((data: Result<any>) => {
            if (data.code == 200) {
                ++this.line.praised
            }
        })
    }

    addForward(id) {
        this.http.post('/line/addForward.htm', { id: id }).subscribe((data: Result<any>) => {
            if (data.code == 200) {
                ++this.line.forward
            }
        })
    }

    addPraisedComment(comment) {
        this.http.post('/comment/addPraised.htm', { id: comment.id, userId: this.userId }).subscribe((data: Result<any>) => {
            if (data.code == 200) {
                if(data.doc){
                    --comment.praised
                }else{
                    ++comment.praised
                }
            }
        })
    }

    addForwardComment(comment) {
        this.http.post('/comment/addForward.htm', { id: comment.id, userId: this.userId }).subscribe((data: Result<any>) => {
            if (data.code == 200) {
                ++comment.forward
            }
        })
    }
}
