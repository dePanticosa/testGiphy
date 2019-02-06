import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class AuthService {

    public isAuth: boolean = false;

    constructor() {
    }

    register(userData: Object) {
        this.isAuth= true;
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuth', 'true');
    }

    login(userData: Object) {
        localStorage.setItem('user', JSON.stringify(userData));
    }


    logout() {
        this.isAuth = false;
        localStorage.setItem('isAuth', 'false');
    }


}
