import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

/*拦截器*/
// import { Interceptor } from '../providers/Interceptor';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
    ],
    providers: [
        // ...Interceptor
    ],
    bootstrap: [AppComponent],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
