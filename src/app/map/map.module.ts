import { NgModule } from '@angular/core';
import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component'
import ComponentModule from '../component'
@NgModule({
    declarations: [MapComponent],
    imports: [
        ComponentModule,
        MapRoutingModule,
    ]
})
export class MapModule { }
