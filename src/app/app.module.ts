import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddressFormComponent } from './address-form/address-form.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { MaterialModule } from './material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { PostComponent } from './post/post.component';
import { NewLinePipe } from './pipes/new-line.pipe';
import { UsersPostComponent } from './components/users-post/users-post.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AddressFormComponent,
    DashboardComponent,
    FirstPageComponent,
    PostComponent,
    NewLinePipe,
    UsersPostComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
