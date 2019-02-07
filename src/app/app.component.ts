import {Component, OnInit} from '@angular/core';
import {GiphyService} from './services/giphy.service';
import {AuthService} from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private giphyService: GiphyService,
                private authService: AuthService) {

    }

    ngOnInit() {
        if (!localStorage.isAuth) {
            localStorage.setItem('isAuth', 'false');
        } else if (JSON.parse(localStorage.isAuth)) {
            this.authService.isAuth = JSON.parse(localStorage.isAuth);
            this.giphyService.getCollection();
        }
    }
}
