import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LineSendService {

    constructor(private http: Http) { }

    delete(body = {}) {
        return this.http.post('/lineSend/delete.htm', body)
    }

    lineSendOfUser(body = {}) {
        return this.http.post('/lineSend/findOneOfUser.htm', body)
    }

    addPraised(body = {}) {
        return this.http.post('/lineSend/addPraised.htm', body)
    }

    insert(body = {}){
        return this.http.post('/lineSend/insert.htm', body)
    }
}
