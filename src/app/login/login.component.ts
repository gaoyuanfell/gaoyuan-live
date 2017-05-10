import {Component, OnInit} from '@angular/core';
import {Result, User} from "../model";
import {UserService} from "../../service/user.service";
import {$Storage} from "../storage";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    user: User = $Storage('user');

    constructor(private userService: UserService,private router: Router) {
    }

    ngOnInit() {
    }

    login() {
        this.userService.login(this.user).subscribe((data: Result<any>) => {
            console.info(data);
            if(data.code == 200){
                Object.assign(this.user,data.doc);
                this.router.navigate(['/index'])
            }
        })
    }

}
