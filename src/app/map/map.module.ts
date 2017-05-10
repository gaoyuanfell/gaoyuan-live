import {NgModule} from '@angular/core';
import {MapRoutingModule} from './map-routing.module';
import {MapComponent} from './map.component'
import {ComponentModule} from '../module'
@NgModule({
    declarations: [MapComponent],
    imports: [
        ComponentModule,
        MapRoutingModule,
    ]
})
export class MapModule {
}
