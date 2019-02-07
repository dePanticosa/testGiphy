import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {GiphyService} from '../services/giphy.service';

@Component({
    selector: 'app-gif-card',
    templateUrl: './gif-card.component.html',
    styleUrls: ['./gif-card.component.scss']
})
export class GifCardComponent implements OnInit {

    public fullSizeGif: string;
    public like: boolean;
    @Input() gif: any;
    @Output() delete = new EventEmitter<string>();

    constructor(public authService: AuthService,
                private modalService: NgbModal,
                private giphyService: GiphyService) {
    }

    ngOnInit() {
        this.like = this.giphyService.checkCollection(this.gif.id);
    }

    openFullSize(content, gif) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            centered: true
        });
        this.fullSizeGif = gif.images.original.url;
    }

    addToCollection(event, id: string) {
        event.stopPropagation();
        this.like = true;
        this.giphyService.addToCollection(id);
    }

    removeWithCollection(event, id: string) {
        event.stopPropagation();
        this.like = false;
        this.giphyService.removeWithCollection(id);
        this.delete.emit(id);
    }


}
