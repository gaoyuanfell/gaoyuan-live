import {UserService} from './../../service/user.service';
import {User, Result} from '../model';
import {Http} from '@angular/http';
import {Component, OnInit} from '@angular/core';
import {fadeInLOutR} from '../../animations/fade-in-l-out-r'

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.less'],
    animations: [fadeInLOutR],
    providers: [UserService]
})
export class UserComponent implements OnInit {
    user: User = {};
    userList: User[] = [];

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.getUserList()
    }

    loginSubmit() {
        this.userService.login(this.user).subscribe((data: Result<any>) => {
            console.info(data)
            data.doc && window.localStorage.setItem("user", JSON.stringify(data.doc));
        })
    }

    registerSubmit() {
        this.userService.insert(this.user).subscribe((data: Result<any>) => {
            console.info(data)
        })
    }

    logoutSubmit() {
        this.userService.logout().subscribe((data: Result<any>) => {
            console.info(data);
            window.localStorage.removeItem("user")
            window.localStorage.removeItem("X-Token")
        })
    }

    getUserList() {
        this.userService.userList().subscribe((data: Result<User[]>) => {
            if (data.code == 200) {
                this.userList = data.doc;
            }
        })
    }
}
