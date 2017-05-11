import {NgModule} from '@angular/core';
import {Module} from '../module'

import {BranchRoutingModule} from './branch-routing.module';
import {BranchComponent} from './branch.component';

@NgModule({
    imports: [
        Module,
        BranchRoutingModule
    ],
    exports: [Module],
    declarations: [BranchComponent]
})
export class BranchModule {
}
