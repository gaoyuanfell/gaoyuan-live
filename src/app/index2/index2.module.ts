import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {Index2RoutingModule} from './index2-routing.module';
import {Index2Component} from "./index2.component";
import {Module} from "../module";

@NgModule({
    imports: [
        Module,
        Index2RoutingModule
    ],
    exports: [Module],
    declarations: [Index2Component],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Index2Module {
}
