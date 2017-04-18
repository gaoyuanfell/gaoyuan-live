import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component'
@NgModule({
    declarations: [UserComponent],
    imports: [
        FormsModule,
        UserRoutingModule,
    ]
})
export class UserModule { }
