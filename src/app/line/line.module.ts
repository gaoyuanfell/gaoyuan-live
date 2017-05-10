import {ComponentModule} from '../module'
import {NgModule} from '@angular/core';
import {LineRoutingModule} from './line-routing.module';
import {LineComponent} from './line.component'
import {LineDetailComponent} from './line-detail/line-detail.component'
@NgModule({
    declarations: [
        LineComponent,
        LineDetailComponent,
    ],
    imports: [
        ComponentModule,
        LineRoutingModule,
    ]
})
export class LineModule {
}
