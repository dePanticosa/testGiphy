import {Component, OnDestroy, OnInit} from '@angular/core';
import {GiphyService} from '../services/giphy.service';
import {AuthService} from '../services/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-my-collection',
    templateUrl: './my-collection.component.html',
    styleUrls: ['./my-collection.component.scss']
})
export class MyCollectionComponent implements OnInit, OnDestroy {

    collectionGifs: Array<Object> = [];
    public gif = {
        file: File = null,
        tagName: ''
    };

    private subscribes = [];

    constructor(private spinner: NgxSpinnerService,
                private giphyService: GiphyService,
                public authService: AuthService) {
    }

    ngOnInit() {
        this.getGifs();
    }

    getGifs() {
        let subscribe = this.giphyService.getGifsFromCollection()
            .subscribe(item => {
                this.collectionGifs = item;
                setTimeout(() => {
                    this.spinner.hide();
                }, 1000);
            });
        this.subscribes.push(subscribe);
    }

    removeFromCollection(e) {
        this.collectionGifs = this.collectionGifs.filter(item => item['id'] !== e);
    }

    uploadGif(files: FileList) {
        this.gif['file'] = files.item(0);
    }

    sendGif() {

        this.spinner.show();
        let subscribe = this.giphyService.uploadGif(this.gif)
            .subscribe(data => {
                this.giphyService.addToCollection(data['id']);
                this.gif['file'] = null;
                this.gif['tagName']= '';
                this.getGifs();
            }, error => {
            });
        this.subscribes.push(subscribe);
    }

    ngOnDestroy() {
        this.subscribes.forEach(item => {
            item.unsubscribe();
        });
    }

}
