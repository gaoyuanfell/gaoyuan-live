import {AfterViewInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild} from '@angular/core';
import {ModalService} from "./modal.service";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
        this.initEvent();
        this.modal.show = () => {
            if(this.state != 0) return;
            if (this.modalService.hasModal()) {
                document.body.classList.add('modal-open');
                document.body.appendChild(this.fadeDiv);
            }else{
                let dialogRef = this.dialogRef.nativeElement;
                let offsetTop = 30 +  this.modalService.getLength() * 50;
                dialogRef.style.marginTop = +offsetTop + 'px';
            }

            this.zIndex = this.modalService.getZIndex();
            this.boxRef.nativeElement.style.zIndex = this.zIndex;

            this.boxRef.nativeElement.style.display = 'block';
            setTimeout(() => {
                this.fadeDiv.classList.add('show');
                this.boxRef.nativeElement.classList.add('show');
                this.state = 1;
            }, 50);
            this.state = -1;
        };

        this.modal.close = () => {
            if(this.state != 1) return;
            this.modalService.delModal();
            this.boxRef.nativeElement.classList.remove('show');
            if(this.modalService.hasModal()){
                this.fadeDiv.classList.remove('show');
                document.body.classList.remove('modal-open');
            }
            setTimeout(() => {
                this.boxRef.nativeElement.style.display = 'none';
                this.modalService.hasModal() && this.renderer.removeChild(document.body, this.fadeDiv);
                this.state = 0;
            }, this.time);
            this.state = -1;
        };

        this.modal.trigger = () => {
            this.state ? this.modal.close() : this.modal.show()
        }
    }

    ngOnInit() {
        this.initFadeDiv();
    }

    constructor(private renderer: Renderer2, private modalService: ModalService) {

    }

    initFadeDiv() {
        this.fadeDiv = document.createElement('div');
        this.fadeDiv.classList.add('modal-backdrop', 'fade');
    }

    initEvent() {
        this.renderer.listen(this.boxRef.nativeElement, 'click', (event: Event) => {
            event.stopPropagation();
            event.preventDefault();
            if (this.boxRef.nativeElement != event.target) return;
            this.modal.close();
        });

        this.renderer.listen(this.okRef.nativeElement, 'click', (event: Event) => {
            event.stopPropagation();
            event.preventDefault();
            this.modal.close();
            this.modal.ok && this.modal.ok();
        });

        this.renderer.listen(this.noRef.nativeElement, 'click', (event: Event) => {
            event.stopPropagation();
            event.preventDefault();
            this.modal.close();
            this.modal.no && this.modal.no();
        });

        this.renderer.listen(this.closeRef.nativeElement, 'click', (event: Event) => {
            event.stopPropagation();
            event.preventDefault();
            this.modal.close();
            this.modal.no && this.modal.no();
        });
    }

    private zIndex: number;
    private state: number = 0;//0 关闭状态 1 打开状态 -1 等待
    private time: number = 150;
    private fadeDiv: HTMLElement;
    @Input() modal: ModalData = {};
    @ViewChild('box') boxRef: ElementRef;
    @ViewChild('dialog') dialogRef: ElementRef;
    @ViewChild('ok') okRef: ElementRef;
    @ViewChild('no') noRef: ElementRef;
    @ViewChild('close') closeRef: ElementRef;
    // @ContentChildren('item') items: QueryList<ElementRef>;
}

export interface ModalData {
    ok?: Function
    no?: Function
    show?: Function
    close?: Function
    trigger?: Function
}
