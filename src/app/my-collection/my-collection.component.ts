import {Component, OnDestroy, OnInit} from '@angular/core';
import {GiphyService} from '../services/giphy.service';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-my-collection',
    templateUrl: './my-collection.component.html',
    styleUrls: ['./my-collection.component.scss']
})
export class MyCollectionComponent implements OnInit, OnDestroy {

    collectionGifs: Array<Object> = [];
    public gif: Object = {
        file: File = null,
        tagName: ''
    };

    private subscribes = [];

    constructor(private giphyService: GiphyService,
                public authService: AuthService) {
    }

    ngOnInit() {
        this.getGifs();
    }

    getGifs() {
        let subscribe = this.giphyService.getGifsFromCollection()
            .subscribe(item => {
                this.collectionGifs = item;
            });
        this.subscribes.push(subscribe)
    }

    removeFromCollection(e) {
        this.collectionGifs = this.collectionGifs.filter(item => item['id'] !== e);
    }

    uploadGif(files: FileList) {
        this.gif['file'] = files.item(0);
    }

    sendGif() {
        let subscribe =  this.giphyService.uploadGif(this.gif)
            .subscribe(data => {
                this.giphyService.addToCollection(data['id']);
                this.getGifs();
            }, error => {
            });
        this.subscribes.push(subscribe)
    }

    ngOnDestroy(){
        this.subscribes.forEach(item => {
            item.unsubscribe();
        })
    }

}
