import {NgModule} from '@angular/core';

import {Index2RoutingModule} from './index2-routing.module';
import {Index2Component} from "./index2.component";
import {ComponentModule} from "../component";
import {PagingComponent} from "../paging/paging.component";

@NgModule({
    imports: [
        ComponentModule,
        Index2RoutingModule
    ],
    declarations: [Index2Component, PagingComponent]
})
export class Index2Module {
}
