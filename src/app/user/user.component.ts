import { User, Result } from './../module';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { fadeInLOutR } from '../../animations/fade-in-l-out-r'

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    animations: [fadeInLOutR]
})
export class UserComponent implements OnInit {
    user: User = {};
    userList: User[] = [];
    constructor(private http: Http) { }

    ngOnInit() {
        this.getUserList()
    }

    loginSubmit() {
        this.http.post('/user/login.htm', this.user).subscribe((data: Result<any>) => {
            console.info(data)
            data.doc && window.localStorage.setItem("user", JSON.stringify(data.doc));
        })
    }

    registerSubmit() {
        this.http.post('/user/insert.htm', this.user).subscribe((data: Result<any>) => {
            console.info(data)
        })
    }

    logoutSubmit() {
        let u = window.localStorage.getItem("user");
        if (u) {
            let id = JSON.parse(u).id;
            this.http.post('/user/logout.htm', { id: id }).subscribe((data: Result<any>) => {
                console.info(data);
                window.localStorage.removeItem("user")
                window.localStorage.removeItem("X-Token")
            })
        }
    }

    getUserList() {
        this.http.post('/user/findList.htm', {}).subscribe((data: Result<User[]>) => {
            if (data.code == 200) {
                this.userList = data.doc;
            }
        })
    }
}
