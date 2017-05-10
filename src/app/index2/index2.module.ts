import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {Index2RoutingModule} from './index2-routing.module';
import {Index2Component} from "./index2.component";
import {ComponentModule} from "../module";
import {Components} from "../components";


@NgModule({
    imports: [
        ComponentModule,
        Index2RoutingModule
    ],
    declarations: [Index2Component, Components],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Index2Module {
}
