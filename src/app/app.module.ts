///<reference path="../service/http-request-service.ts"/>
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
import { SearchComponent } from './search/search.component';
import { ExploreComponent } from './explore/explore.component';
import { AccountsComponent } from './accounts/accounts.component';
import { PersonalComponent } from './personal/personal.component';
import { LoginComponent } from './login/login.component';
import {HttpRequestService} from "../service/http-request-service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        HeaderComponent,
        FooterComponent,
        SearchComponent,
        ExploreComponent,
        AccountsComponent,
        PersonalComponent,
        LoginComponent,
    ],
    exports: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        // {provide: APP_BASE_HREF, useValue: '/'},
        httpInterceptor,
        HttpRequestService,
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
