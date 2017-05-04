import { NgModule } from '@angular/core';
import ComponentModule from '../component'

import { BranchRoutingModule } from './branch-routing.module';
import { BranchComponent } from './branch.component';

@NgModule({
    imports: [
        ComponentModule,
        BranchRoutingModule
    ],
    declarations: [BranchComponent]
})
export class BranchModule { }
