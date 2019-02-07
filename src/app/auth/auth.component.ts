import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {GiphyService} from '../services/giphy.service';

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    public form = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    constructor(public router: Router,
                public authService: AuthService,
                public giphyService: GiphyService) {
    }

    ngOnInit() {
    }

    register() {
        this.authService.setUser(this.form.value);
        this.router.navigate(['/']);
    }

    login() {
        if (this.authService.getUser(this.form.value)) {
            this.giphyService.getCollection();
            this.router.navigate(['/']);
        } else {

        }
    }

}