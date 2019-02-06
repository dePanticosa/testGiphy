import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { MainboardModule } from './mainboard/mainboard.module';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';

import { GiphyService } from './services/giphy.service';
import { AuthService } from './services/auth.service';
import { MyCollectionComponent } from './my-collection/my-collection.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AuthComponent,
        MyCollectionComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MainboardModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgbModule
    ],
    providers: [
        GiphyService,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
