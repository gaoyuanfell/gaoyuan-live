import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LineComponent } from './line.component'
import { LineDetailComponent } from './line-detail/line-detail.component'

const routes: Routes = [
    {
        path: 'line',
        component: LineComponent,
    },
    {
        path: 'line/:id',
        component: LineDetailComponent,
        data:{as:12}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LineRoutingModule { }
