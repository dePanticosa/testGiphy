import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';

import { GiphyService } from './services/giphy.service';
import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { MyCollectionComponent } from './my-collection/my-collection.component';
import { MainboardComponent } from './mainboard/mainboard.component';
import { GifCardComponent } from './gif-card/gif-card.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AuthComponent,
        MyCollectionComponent,
        MainboardComponent,
        GifCardComponent,
    ],
    entryComponents: [
        GifCardComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        InfiniteScrollModule
    ],
    providers: [
        GiphyService,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
