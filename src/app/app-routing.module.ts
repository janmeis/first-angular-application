import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressFormComponent } from './address-form/address-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  { path: '', redirectTo: 'first-page', pathMatch: 'full' },
  { path: 'first-page', component: FirstPageComponent, title: 'first-page' },
  { path: 'address-form', component: AddressFormComponent, title: 'address-form' },
  { path: 'dashboard', component: DashboardComponent, title: 'dashboard' },
  { path: 'posts', component: PostComponent, title: 'posts' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
