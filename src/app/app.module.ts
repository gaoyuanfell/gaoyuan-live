import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpModule} from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';
import {AppComponent} from './app.component';

import {AppRoutingModule} from './app-routing.module';

/*拦截器*/
import {httpInterceptor} from '../providers/Interceptor';
import {IndexComponent} from './index/index.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        HeaderComponent,
        FooterComponent,
    ],
    exports: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
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
