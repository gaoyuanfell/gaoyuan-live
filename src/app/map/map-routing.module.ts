import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MapComponent } from './map.component'

const routes: Routes = [
    {
        path: 'map',
        component: MapComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapRoutingModule { }