import {NgModule} from '@angular/core';
import {IndexRoutingModule} from './index-routing.module';
import {ComponentModule} from "../component";
import {IndexComponent} from "./index.component";

@NgModule({
    imports: [
        ComponentModule,
        IndexRoutingModule
    ],
    declarations: [IndexComponent]
})
export class IndexModule {
}
