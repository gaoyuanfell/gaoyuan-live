import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from "../../service/http-request-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Result} from "../model";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

    constructor(private _urlService: HttpRequestService, private fb: FormBuilder, private _router: Router) {
    }

    isLogin: boolean = true;
    loginFrom: FormGroup;
    registerFrom: FormGroup;

    ngOnInit() {
        this.loginFrom = this.fb.group({
            user: ['', Validators.required],
            password: ['', Validators.required],
        });
        this.registerFrom = this.fb.group({
            user: ['', [Validators.required,Validators.minLength(4)]],
            password: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required],
            nickName: [''],
        });
    }

    login() {
        console.info(this.loginFrom);
        this._urlService.login(this.loginFrom.value).subscribe((res: Result<any>) => {
            if (res.code === 200) {
                this._router.navigate(['/index']);
            }
        });
    }

    register() {
        for(let f in this.registerFrom.value){
            let ctrl = this.registerFrom.get(f);
            console.info(ctrl);
            console.info(`${f}:${ctrl.valid}`);
        }

        // this._urlService.insertUser(this.registerFrom.value).subscribe((res: Result<any>) => {
        //     if (res.code === 200) {
        //         this.isLogin = !this.isLogin;
        //         this.loginFrom.setValue({
        //             user: this.registerFrom.value.user,
        //             password: this.registerFrom.value.password,
        //         })
        //     }
        // })
    }
}
