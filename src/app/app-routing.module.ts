import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {SearchComponent} from "./search/search.component";
import {ExploreComponent} from "./explore/explore.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {PersonalComponent} from "./personal/personal.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full',
    },
    {
        path: 'index',
        component: IndexComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'explore',
        component: ExploreComponent
    },
    {
        path: 'accounts',
        component: AccountsComponent
    },
    {
        path: 'personal',
        component: PersonalComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
