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
        this.http.post('http://localhost:8082/user/login.htm',this.user).subscribe( (data:any) => {
            console.info(data)
            data.doc && window.localStorage.setItem("user",JSON.stringify(data.doc));
        } )
    }

    registerSubmit(){
        this.http.post('http://localhost:8082/user/insert.htm',this.user).subscribe( (data) => {
            console.info(data)
        } )
    }

    logoutSubmit(){
        let u = window.localStorage.getItem("user");
        if(u){
            let id = JSON.parse(u).id;
            this.http.post('http://localhost:8082/user/logout.htm',{id:id}).subscribe( (data) => {
                console.info(data)
                window.localStorage.removeItem("user")
                window.localStorage.removeItem("X-Token")
            } )
        }

    }

}
