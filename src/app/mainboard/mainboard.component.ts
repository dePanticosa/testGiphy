import {Component, OnDestroy, OnInit} from '@angular/core';
import {GiphyService} from '../services/giphy.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/internal/operators';

@Component({
    selector: 'app-mainboard',
    templateUrl: './mainboard.component.html',
    styleUrls: ['./mainboard.component.scss']
})
export class MainboardComponent implements OnInit, OnDestroy {

    throttle = 300;
    scrollDistance = 1;
    scrollUpDistance = 2;

    public allGifs: Array<Object> = [];
    private subscribes = [];

    constructor(public giphyService: GiphyService) {
    }

    ngOnInit() {
        this.getGifs(this.giphyService.currSearch);
    }

    getGifs(params: string) {
        this.giphyService.getGifs(params);
        let subscribe = this.giphyService.gifs$.subscribe(gifs => this.allGifs = gifs);
        this.subscribes.push(subscribe)
    }

    onScrollDown () {
        this.giphyService.limit += 25;
        this.getGifs(this.giphyService.currSearch);
    }

    ngOnDestroy(){
        this.subscribes.forEach(subscribe => subscribe.unsubscribe())
    }

}
