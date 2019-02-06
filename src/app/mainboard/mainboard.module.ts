import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material'
import { CommonModule } from '@angular/common';


import { MainboardComponent } from './mainboard.component';
import { GifCardComponent } from './gif-card/gif-card.component';


@NgModule({
    declarations: [
        MainboardComponent,
        GifCardComponent
    ],
    imports: [
        MatCardModule,
        CommonModule
    ],
    providers: [],
    bootstrap: []
})
export class MainboardModule { }
