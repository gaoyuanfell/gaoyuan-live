import {NgModule} from '@angular/core';
import {MapRoutingModule} from './map-routing.module';
import {MapComponent} from './map.component'
import {Module} from '../module'
@NgModule({
    declarations: [MapComponent],
    exports: [Module],
    imports: [
        Module,
        MapRoutingModule,
    ]
})
export class MapModule {
}
