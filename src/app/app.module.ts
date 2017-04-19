import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
/*拦截器*/
import { Interceptor } from '../providers/Interceptor';
import pipe from '../pipe/pipe';
//组件
import { MapModule } from './map/map.module';
import { MapComponent } from './map/map.component';
import { UserModule } from './user/user.module';
import { LineModule } from './line/line.module';
import ComponentModule from "./component";

@NgModule({
    declarations: [
        AppComponent,
        ...pipe,
    ],
    imports: [
        ComponentModule,
        HttpModule,
        AppRoutingModule,
        MapModule,
        UserModule,
        LineModule,
    ],
    providers: [
        ...Interceptor,
        { provide: APP_BASE_HREF, useValue: '/' },
    ],
    bootstrap: [AppComponent],
    // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
