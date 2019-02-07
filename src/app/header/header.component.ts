import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {GiphyService} from '../services/giphy.service';
import {NavigationEnd, Router} from '@angular/router';
import {fromEvent, Observable} from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/internal/operators';
import {MainboardComponent} from '../mainboard/mainboard.component';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

    public showSearch: boolean = true;
    public search$: Observable<any>;
    private subscribes = [];

    @ViewChild('searchInput') input: ElementRef;

    constructor(public authService: AuthService,
                public giphyService: GiphyService,
                private router: Router) {
    }

    ngOnInit() {
        this.router.events.subscribe(params => {
            if (params instanceof NavigationEnd) {
                if (params.url !== '/') {
                    this.showSearch = false;
                } else {
                    this.showSearch = true;
                }
            }
        });
    }

    ngAfterViewInit() {
        this.search$ = fromEvent<any>(this.input.nativeElement, 'keyup')
            .pipe(
                map(event => event.target.value),
                debounceTime(300),
                distinctUntilChanged()
            );
        let subscribe = this.search$.subscribe(val => {
            this.giphyService.currSearch = val;
            this.giphyService.limit = 25;
            this.searchValues(val);
        });
        this.subscribes.push(subscribe)
    }

    searchValues(param: string) {
        this.giphyService.getGifs(param)
    }

    clearSearch(){
        this.input.nativeElement.value = '';
        this.giphyService.getGifs('')
    }

    logout() {
        this.authService.isAuth = false;
        localStorage.setItem('isAuth', 'false');
    }

    ngOnDestroy(){
        this.subscribes.forEach(item => item.unsubscribe())
    }

}
