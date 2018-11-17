import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { HeaderComponent } from './navigation/header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { MaterialModule } from './material.module';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingComponent } from './training/past-training/past-training.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { StopTrainingComponent } from './training/current-training/stop-training.component';
import { TrainingComponent } from './training/training.component';
import { TrainingService } from './training/training.service';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentTrainingComponent,
    HeaderComponent,
    LoginComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    SignupComponent,
    TrainingComponent,
    WelcomeComponent,
    SidenavListComponent,
    StopTrainingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, TrainingService],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent]
})
export class AppModule {}
