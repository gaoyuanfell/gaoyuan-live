import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { TabsModule } from './tabs/tabs.modile';

import { HomeModule } from './home/home.modile'

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { TabsComponent } from './tabs/tabs.component';
import { HeaderComponent } from './header/header.component';
import { ConfigComponent } from './config/config.component';

/*拦截器*/
import { Interceptor } from '../providers/Interceptor';

/*组件*/
import { ToggleButtonModule } from '../common';

import { Home2Module } from './home/home2/home2.modile';

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
        ...Interceptor
    ],
    bootstrap: [AppComponent],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
