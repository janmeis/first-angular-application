import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AddressListComponent } from './address-list/address-list.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressFormDialogComponent } from './components/address-form-dialog/address-form-dialog.component';
import { UsersPostComponent } from './components/users-post/users-post.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { MaterialModule } from './material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { NewLinePipe } from './pipes/new-line.pipe';
import { StatePipe } from './pipes/state.pipe';
import { ZipCodePipe } from './pipes/zip-code.pipe';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    FirstPageComponent,
    PostComponent,
    NewLinePipe,
    UsersPostComponent,
    AddressListComponent,
    ZipCodePipe,
    StatePipe,
    AddressFormDialogComponent,
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
