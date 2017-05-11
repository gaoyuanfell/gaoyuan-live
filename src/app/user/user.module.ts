import {NgModule} from '@angular/core';
import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component'
import {Module} from '../module'
@NgModule({
    declarations: [UserComponent],
    imports: [
        Module,
        UserRoutingModule,
    ],
    exports: [Module],
})
export class UserModule {
}
