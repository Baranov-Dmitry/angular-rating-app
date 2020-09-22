import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ViewPhoneComponent} from './view-phone/view-phone.component';
import {CreateComponent} from './create/create.component';

const routes: Routes = [
  {path: '', component: ViewPhoneComponent},
  {path: 'create', component: CreateComponent},
  {path: 'error', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/error'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
