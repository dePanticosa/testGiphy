import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

@Component({
    selector: 'app-gif-card',
    templateUrl: './gif-card.component.html',
    styleUrls: ['./gif-card.component.scss']
})
export class GifCardComponent implements OnInit {

    fullSizeGif: string;
    like: boolean = false;
    @Input() gifs: any;
    closeResult: string;

    constructor(public service: AuthService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        setTimeout(() => console.log(this.gifs), 500);
    }

    openFullSize(content, gif){
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true})
            .result
            .then((result) => {
            this.closeResult = `Closed with: ${result}`;
        });
        this.fullSizeGif = gif.images.original.url
    }

}
