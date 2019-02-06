import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {GiphyService} from '../services/giphy.service';

@Component({
    selector: 'app-my-collection',
    templateUrl: './my-collection.component.html',
    styleUrls: ['./my-collection.component.scss']
})
export class MyCollectionComponent implements OnInit {

    collectionGifs$: Observable<Object[]>;

    constructor(private giphyService: GiphyService) {
    }

    ngOnInit() {
        this.getGifs();
    }

    getGifs() {
        this.collectionGifs$ = this.giphyService.getCollection();
    }

}
