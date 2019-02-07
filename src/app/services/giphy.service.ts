import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, timer} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {delayWhen, retryWhen, shareReplay} from 'rxjs/internal/operators';


@Injectable()
export class GiphyService {

    public API_KEY = 'impIKaWwmIsoXlQxikVv6psrMYAsmjOc';
    public URL = 'https://api.giphy.com';
    public URL_UPLOAD = 'https://upload.giphy.com';

    public collection = [];
    public limit = 25;
    public currSearch = '';

    private subject = new BehaviorSubject([]);
    public gifs$ = this.subject.asObservable();

    constructor(private http: HttpClient) {
    }

    getGifs(search: string = '') {
        console.log(this.limit);
        this.currSearch = search === '' ? 'gif' : search;
        const params = new HttpParams().set('api_key', this.API_KEY)
            .append('q', this.currSearch)
            .append('limit', `${this.limit}`);
        this.http.get(`${this.URL}/v1/gifs/search`, {params: params})
            .pipe(
                map(res => res['data'])
            )
            .subscribe(gifs => this.subject.next(gifs))
    }

    getGifsFromCollection(): Observable<Object[]> {
        let ids = this.collection.join();
        let params = new HttpParams().set('api_key', this.API_KEY)
            .append('ids', ids);
        return this.http.get(`${this.URL}/v1/gifs`, {params: params})
            .pipe(
                map(res => res['data'])
            );
    }

    uploadGif(gif): Observable<boolean> {

        let formData: FormData = new FormData();
        formData.append('file', gif.file);

        let params = new HttpParams().set('api_key', this.API_KEY)
            .append('tags', gif.tagName);
        return this.http.post(`${this.URL_UPLOAD}/v1/gifs`, formData, {params: params})
            .pipe(
                map(res => res['data'])
            );
    }


    getCollection() {
        this.collection = JSON.parse(localStorage.getItem('collection'));
    }

    addToCollection(id: string) {
        this.collection.push(id);
        this.updateCollection();
    }

    removeWithCollection(id: string) {
        this.collection = this.collection.filter(item => id !== item);
        this.updateCollection();
    }

    updateCollection() {
        localStorage.setItem('collection', JSON.stringify(this.collection));
    }

    checkCollection(id: string) {
        return this.collection.some(item => true ? item === id : false);
    }

}
