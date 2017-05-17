import {NgModule} from '@angular/core';
import {Directives} from "./directives";
import {Components} from "./components";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ModalService} from "./components/modal/modal.service";
import {Pipes} from "../pipe/pipe";
import {AlertModule} from "./directives/alert/alert.module";
import {DatepickerModule} from "./components/datepicker/datepicker.module";


import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        FormsModule,

        AlertModule,
        DatepickerModule.forRoot(),
        NgbModule.forRoot(),
    ],
    exports: [
        Components,
        Directives,
        Pipes,
        NgbModule,

        AlertModule,
        DatepickerModule,


        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [Pipes, Components, Directives],
    providers: [ModalService],
})
export class Module {
}
