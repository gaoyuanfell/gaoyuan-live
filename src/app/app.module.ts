import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpModule} from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';
import {AppComponent} from './app.component';

import {AppRoutingModule} from './app-routing.module';

/*拦截器*/
import {httpInterceptor} from '../providers/Interceptor';
import {DataPipe} from '../pipe/pipe';
import {ComponentModule} from "./module";

//模块
import {MapModule} from './map/map.module';
import {UserModule} from './user/user.module';
import {LineModule} from './line/line.module';
import {BranchModule} from './branch/branch.module';
import {LoginModule} from "./login/login.module";
import {IndexModule} from "./index/index.module";
import {HomeModule} from "./home/home.module";
import {Index2Module} from "./index2/index2.module";



@NgModule({
    declarations: [
        AppComponent,
        DataPipe,
    ],
    imports: [
        ComponentModule,
        HttpModule,
        AppRoutingModule,
        MapModule,
        UserModule,
        LineModule,
        BranchModule,
        LoginModule,
        IndexModule,
        Index2Module,
        HomeModule
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        httpInterceptor,
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
