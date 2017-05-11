import {AfterViewInit, Directive, ElementRef, Input, Renderer2, ViewChild, ViewRef} from '@angular/core';

@Directive({
    selector: '[modal]'
})
export class ModalDirective implements AfterViewInit {
    ngAfterViewInit(): void {
        let div = this.fadeDiv = document.createElement('div');
        div.classList.add('modal-backdrop', 'fade', 'show');

        this.renderer.listen(this._target, 'click', () => {
            this._target.classList.remove('show');
            this.fadeDiv.classList.remove('show');
            setTimeout(() => {
                this._target.style.display = 'none';
                this.renderer.removeChild(document.body, this.fadeDiv)
            }, this.time)
        })
    }

    constructor(el: ElementRef, private renderer: Renderer2,) {
        renderer.listen(el.nativeElement, 'click', () => {
            document.body.classList.add('modal-open');
            this.fadeDiv.classList.add('show');
            document.body.appendChild(this.fadeDiv);

            this._target.style.display = 'block';

            setTimeout(() => {
                this._target.classList.add('show');
            })
        });
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
