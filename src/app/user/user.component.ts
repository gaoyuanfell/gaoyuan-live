import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { User } from './user';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    user: User = {};
    constructor(private http: Http) { }

    ngOnInit() {

    }

    loginSubmit() {
        this.http.post('http://localhost:8082/user/login.htm',this.user).subscribe( (data) => {
            console.info(data)
        } )
    }

    registerSubmit(){
        this.http.post('http://localhost:8082/user/insert.htm',this.user).subscribe( (data) => {
            console.info(data)
        } )
    }

}
