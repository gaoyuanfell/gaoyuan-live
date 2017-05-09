import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';
import {ComponentModule} from "../component";
import {HomeComponent} from "./home.component";

@NgModule({
    imports: [
        ComponentModule,
        HomeRoutingModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule {
}
