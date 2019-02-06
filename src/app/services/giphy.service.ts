import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {delayWhen, retryWhen, shareReplay} from 'rxjs/internal/operators';


@Injectable()
export class GiphyService {

    public API_KEY = 'impIKaWwmIsoXlQxikVv6psrMYAsmjOc';
    public URL = 'https://api.giphy.com';
    public URL_UPLOAD = 'https://upload.giphy.com';

    public favoritesListId = [];
    public favorites = [];
    public limit = 50;
    public currSearch = 'gif';
    public pending = false;


    constructor(private http: HttpClient) {

    }

    getGifs(search: string): Observable<Object[]> {
        this.currSearch = search === '' ? 'gif' : search;
        const params = new HttpParams().set('api_key', this.API_KEY)
            .append('q', this.currSearch)
            .append('limit', `${this.limit}`);
        return this.http.get(`${this.URL}/v1/gifs/search`, {params: params})
            .pipe(
                map(res => res['data'])
            );
    }

    getCollection(){
    }

}
