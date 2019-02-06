import {Component, OnInit} from '@angular/core';
import {GiphyService} from '../services/giphy.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/internal/operators';

@Component({
    selector: 'app-mainboard',
    templateUrl: './mainboard.component.html',
    styleUrls: ['./mainboard.component.scss']
})
export class MainboardComponent implements OnInit {

    constructor(private giphyService: GiphyService) {
    }

    allGifs$: Observable<Object[]>;

    ngOnInit() {
        this.getGifs();
    }

    getGifs() {
        this.allGifs$ = this.giphyService.getGifs('');
    }

}
