import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
/*拦截器*/
import { Interceptor } from '../providers/Interceptor';
import pipe from '../pipe/pipe';
import { UserComponent } from './user/user.component';

//组件
import { MapModule } from './map/map.module';
import { MapComponent } from './map/map.component';

@NgModule({
    declarations: [
        AppComponent,
        ...pipe,
        UserComponent,
        // MapComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        MapModule
    ],
    providers: [
        ...Interceptor,
        { provide: APP_BASE_HREF, useValue: '/' },
    ],
    bootstrap: [AppComponent],
    // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
