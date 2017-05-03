import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BranchService {

    constructor(private http: Http) { }

    insert(body = {}) {
        return this.http.post('/branch/insert.htm', body);
    }

    branchPage(body = {}) {
        return this.http.post('/branch/findPage.htm', body);
    }
}
