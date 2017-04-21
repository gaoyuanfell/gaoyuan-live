import { User, Result } from './../module';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

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
        this.http.post('/user/login.htm',this.user).subscribe( (data:Result<any>) => {
            console.info(data)
            data.doc && window.localStorage.setItem("user",JSON.stringify(data.doc));
        } )
    }

    registerSubmit(){
        this.http.post('/user/insert.htm',this.user).subscribe( (data:Result<any>) => {
            console.info(data)
        } )
    }

    logoutSubmit(){
        let u = window.localStorage.getItem("user");
        if(u){
            let id = JSON.parse(u).id;
            this.http.post('/user/logout.htm',{id:id}).subscribe( (data:Result<any>) => {
                console.info(data);
                window.localStorage.removeItem("user")
                window.localStorage.removeItem("X-Token")
            } )
        }
    }
}
