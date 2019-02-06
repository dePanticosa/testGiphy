import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainboardComponent } from './mainboard/mainboard.component';
import {AuthComponent} from './auth/auth.component';
import {MyCollectionComponent} from './my-collection/my-collection.component';

const routes: Routes = [
    { path: '', redirectTo: '/mainboard', pathMatch: 'full' },
    { path: 'mainboard', component: MainboardComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'collection', component: MyCollectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
