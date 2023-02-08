import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressListComponent } from './address-list/address-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  { path: '', redirectTo: 'first-page', pathMatch: 'full' },
  { path: 'first-page', component: FirstPageComponent, pathMatch: 'full', title: 'first-page' },
  { path: 'address-list', component: AddressListComponent, pathMatch: 'full', title: 'address-list' },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', title: 'dashboard' },
  { path: 'posts', component: PostComponent, pathMatch: 'full', title: 'posts' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
