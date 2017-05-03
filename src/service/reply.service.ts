import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReplyService {

    constructor(private http: Http) { }

    insert(body = {}){
        return this.http.post('/reply/insert.htm',body)
    }

    addPraised(body = {}) {
        return this.http.post('/reply/addPraised.htm', body)
    }

    replyOfComPage(body = {}) {
        return this.http.post('/reply/findOfComPage.htm', body)
    }
}
