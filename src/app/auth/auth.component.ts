import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';


export interface User {
    username: string;
    password: string;
    collection: string[];
}

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
                public authService: AuthService) {
    }

    ngOnInit() {

    }

    register() {
        let userData: User = {
           username: this.form.value.username,
           password: this.form.value.password,
           collection: []
        };
        this.authService.register(userData);
        this.router.navigate(['/']);
    }

    login() {
        let user;
        if(!localStorage.user){
            //message
            console.log('sho?')
        } else {
            user = JSON.parse(localStorage.getItem('user'));
            if (user.username === this.form.value.username && user.password === this.form.value.password) {
                this.authService.isAuth= true;
                localStorage.setItem('isAuth', 'true');
                this.router.navigate(['/']);
            } else if (user.username !== this.form.value.username) {
                //message
            } else if (user.password !== this.form.value.password) {
                //message
            }
        }
    }

}