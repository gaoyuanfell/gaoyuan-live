import {NgModule} from '@angular/core';
import {Directives} from "./directives";
import {Components} from "./components";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        FormsModule,
    ],
    exports: [
        Components,
        Directives,

        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [Components, Directives]
})
export class Module {
}
