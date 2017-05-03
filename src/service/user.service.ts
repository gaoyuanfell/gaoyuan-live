import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    constructor(private http: Http) { }

    login(body = {}) {
        return this.http.post('/user/login.htm', body);
    }

    logout() {
        return this.http.get('/user/logout.htm')
    }

    userList(body = {}) {
        return this.http.post('/user/findList.htm', body)
    }

    insert(body = {}) {
        return this.http.post('/user/insert.htm', body);
    }
}
