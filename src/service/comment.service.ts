import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class CommentService {

    constructor(private http: Http) {
    }

    insert(body = {}) {
        return this.http.post('/comment/insert.htm', body)
    }

    commentPage(body = {}) {
        return this.http.post('/comment/findPage.htm', body)
    }

    commentPageOfType(body = {}) {
        return this.http.post('/comment/findPageOfType.htm', body)
    }

    addPraised(body = {}) {
        return this.http.post('/comment/addPraised.htm', body)
    }
}
