import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Index2Component} from "./index2.component";

const routes: Routes = [
    {
        path: 'index2',
        component: Index2Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Index2RoutingModule {
}
