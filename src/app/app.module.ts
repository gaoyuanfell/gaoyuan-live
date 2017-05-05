import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

/*拦截器*/
import { httpInterceptor } from '../providers/Interceptor';
import { DataPipe } from '../pipe/pipe';
import { ComponentModule } from "./component";
//组件
import { MapModule } from './map/map.module';
import { UserModule } from './user/user.module';
import { LineModule } from './line/line.module';
import { BranchModule } from './branch/branch.module';

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
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        httpInterceptor,
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
