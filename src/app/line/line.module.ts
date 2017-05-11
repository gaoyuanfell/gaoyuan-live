import {Module} from '../module'
import {NgModule} from '@angular/core';
import {LineRoutingModule} from './line-routing.module';
import {LineComponent} from './line.component'
import {LineDetailComponent} from './line-detail/line-detail.component'
@NgModule({
    declarations: [
        LineComponent,
        LineDetailComponent,
    ],
    exports: [Module],
    imports: [
        Module,
        LineRoutingModule,
    ]
})
export class LineModule {
}
