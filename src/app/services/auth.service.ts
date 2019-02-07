import {Injectable} from '@angular/core';
import {GiphyService} from './giphy.service';

@Injectable()
export class AuthService {

    public isAuth: boolean = false;

    constructor(public giphyService: GiphyService) {
    }

    setUser(userData) {
        this.isAuth = true;
        this.giphyService.collection = [];
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('collection', JSON.stringify(this.giphyService.collection));
    }

    getUser(userData) {
        let user;
        if (!localStorage.user) {
            return false;
        } else {
            user = JSON.parse(localStorage.getItem('user'));
            if (user.username === userData.username && user.password === userData.password) {
                this.isAuth = true;
                localStorage.setItem('isAuth', 'true');
                return true;
            } else if (user.username !== userData.username) {
                return false;
            } else if (user.password !== userData.password) {
                return false;
            }
        }
    }

}
