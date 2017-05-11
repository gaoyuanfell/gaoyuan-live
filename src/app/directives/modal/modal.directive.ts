import {AfterViewInit, Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
    selector: '[modal]'
})
export class ModalDirective implements AfterViewInit {
    ngAfterViewInit(): void {
        this.fadeDiv = document.createElement('div');
        this.fadeDiv.classList.add('modal-backdrop', 'fade');
        this.renderer.listen(this._target, 'click', (event:Event) => {
            event.stopPropagation();
            event.preventDefault();
            if(this._target != event.target) return;
            this.close();
        })
    }

    constructor(el: ElementRef, private renderer: Renderer2,) {
        renderer.listen(el.nativeElement, 'click', () => {
            this.show();
        });
    }

    show(){
        document.body.classList.add('modal-open');
        document.body.appendChild(this.fadeDiv);
        this._target.style.display = 'block';
        setTimeout(() => {
            this.fadeDiv.classList.add('show');
            this._target.classList.add('show');
        },100)
    }

    close(){
        this._target.classList.remove('show');
        this.fadeDiv.classList.remove('show');
        document.body.classList.remove('modal-open');
        setTimeout(() => {
            this._target.style.display = 'none';
            this.renderer.removeChild(document.body, this.fadeDiv)
        }, this.time)
    }

    private time: number = 150;
    private _modal: any;
    private _target: HTMLElement;
    private fadeDiv: HTMLElement;

    @Input() get modal() {
        return this._modal;
    }

    set modal(value: any) {
        this._modal = value;
        console.info(value)
    }

    @Input() get target() {
        return this._target;
    }

    set target(value: HTMLElement) {
        this._target = value;
        console.info(value.accessKey)
    }
}

export interface ModalData {
    ok?:Function
    no?:Function
}
