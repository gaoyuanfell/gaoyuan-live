import {NgModule} from '@angular/core';
import {IndexRoutingModule} from './index-routing.module';
import {Module} from "../module";
import {IndexComponent} from "./index.component";

@NgModule({
    imports: [
        Module,
        IndexRoutingModule
    ],
    exports: [Module],
    declarations: [IndexComponent]
})
export class IndexModule {
}
