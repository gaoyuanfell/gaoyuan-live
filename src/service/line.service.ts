import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class LineService {

    constructor(private http: Http) {
    }

    delete(body = {}) {
        return this.http.post('/line/delete.htm', body);
    }

    lineList(body = {}) {
        return this.http.post('/user/findList.htm', body)
    }

    linePage(body = {}) {
        return this.http.post('/line/findPage.htm', body)
    }

    linePageAllData(body = {}) {
        return this.http.post('/line/findPageAllDate.htm', body)
    }

    insert(body = {}) {
        return this.http.post('/line/insert.htm', body)
    }

    lineOfUser(body = {}) {
        return this.http.post('/line/findOneOfUser.htm', body)
    }

    addPraised(body = {}) {
        return this.http.post('/line/addPraised.htm', body)
    }
}
