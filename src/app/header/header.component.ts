import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {GiphyService} from '../services/giphy.service';
import {NavigationEnd, Router} from '@angular/router';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public state: string;
    public showSearch: boolean;

    constructor(public authService: AuthService,
                private giphyService: GiphyService,
                private router: Router) {
    }

    ngOnInit() {
        this.router.events.subscribe(params => {
            if (params instanceof NavigationEnd) {
                if (params.url === '/auth') {
                    this.showSearch = false;
                } else {
                    this.showSearch = true;
                }
            }
        });
    }

    getCollection(){

    }

    clearSearch(){

    }

    uploadGif(){

    }

    logout() {
        this.authService.isAuth = false;
        localStorage.setItem('isAuth', 'false');
    }

}
