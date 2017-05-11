import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';
import {Module} from "../module";
import {HomeComponent} from "./home.component";

@NgModule({
    imports: [
        Module,
        HomeRoutingModule
    ],
    exports: [Module],
    declarations: [HomeComponent]
})
export class HomeModule {
}
