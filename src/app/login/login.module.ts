import {NgModule} from '@angular/core';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from "./login.component";
import {Module} from "../module";

@NgModule({
    imports: [
        Module,
        LoginRoutingModule
    ],
    exports: [Module],
    declarations: [LoginComponent]
})
export class LoginModule {
}
