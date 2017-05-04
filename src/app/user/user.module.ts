import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component'
import ComponentModule from '../component'
@NgModule({
    declarations: [UserComponent],
    imports: [
        ComponentModule,
        UserRoutingModule,
    ]
})
export class UserModule {  }
