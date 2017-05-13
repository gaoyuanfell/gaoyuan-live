import {AfterViewInit, Component, Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popovers-window',
    host: {
        '[class]': 'pClass[placement]'
    },
    template: `
        <h3 class="popover-title" *ngIf="title">{{title}}</h3>
        <div class="popover-content">
            <ng-content></ng-content>
        </div>
    `
})
export class PopoversDirectiveWindow {
    @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
    @Input() title: string;

    private top: string[] = [
        'popover',
        'fade',
        'bs-tether-element',
        'bs-tether-abutted',
        'bs-tether-abutted-top',
        'bs-tether-target-attached-top',
        'bs-tether-element-attached-bottom',
        'bs-tether-element-attached-center',
        'bs-tether-target-attached-center',
    ];

    private bottom: string[] = [
        'popover',
        'fade',
        'bs-tether-element',
        'bs-tether-abutted',
        'bs-tether-element-attached-top',
        'bs-tether-element-attached-center',
        'bs-tether-target-attached-bottom',
        'bs-tether-target-attached-center',
    ];

    private left: string[] = [
        'popover',
        'fade',
        'bs-tether-element',
        'bs-tether-enabled',
        'bs-tether-abutted',
        'bs-tether-abutted-left',
        'bs-tether-target-attached-left',
        'bs-tether-element-attached-right',
        'bs-tether-element-attached-middle',
        'bs-tether-target-attached-middle',
    ];

    private right: string[] = [
        'popover',
        'fade',
        'bs-tether-element',
        'bs-tether-enabled',
        'bs-tether-target-attached-right',
        'bs-tether-element-attached-left',
        'bs-tether-element-attached-middle',
        'bs-tether-target-attached-middle',
    ];

    private pClass = {
        top: this.top.join(" "),
        bottom: this.bottom.join(" "),
        left: this.left.join(" "),
        right: this.right.join(" "),
    }
}


@Directive({
    selector: '[appPopovers]',
    exportAs: 'appPopovers'
})
export class PopoversDirective implements AfterViewInit {
    ngAfterViewInit(): void {
        this.initPopovers();
        this.initEvent();
    }

    constructor(private viewContainerRef: ViewContainerRef, private el: ElementRef, private renderer: Renderer2) {

    }

    @Input('p-focus') focus: string;
    @Input('p-hover') hover: string;
    @Input('p-title') title: string;
    @Input('p-content') content: string | TemplateRef<PopoversDirectiveWindow>;
    @Input('p-placement') placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
    private popoversEl: HTMLDivElement;
    private titleEl: HTMLHeadingElement;
    private contentEl: HTMLDivElement;
    private state: number = 0;// 0 隐藏 1 显示 -1 等待
    private stateFocus: number = 0;// 0 未会焦点 1 获取焦点
    private tether: any;

    initEvent() {
        let focus = this.focus;
        let hover = this.hover;

        if (focus == 'focus') {
            this.renderer.listen(this.el.nativeElement, 'focus', () => {
                this.stateFocus = 1;
                this.show();
            });

            this.renderer.listen(this.el.nativeElement, 'blur', () => {
                this.stateFocus = 0;
                this.close();
            });
        } else {
            this.renderer.listen(this.el.nativeElement, 'click', () => {
                this.trigger();
            });
        }

        if (hover == 'hover') {
            this.renderer.listen(this.el.nativeElement, 'mouseover', () => {
                !this.stateFocus && this.show();
            });

            this.renderer.listen(this.el.nativeElement, 'mouseleave', () => {
                // if(this.clearTime && this.state == -1){
                //     clearTimeout(this.clearTime);
                //     this.popoversEl && document.body.removeChild(this.popoversEl);
                //     this.tether && this.tether.destroy()
                //     this.state = 0;
                //     this.clearTime = 0;
                // }
                !this.stateFocus && this.close();
            });
        }

    }

    trigger() {
        !this.state ? this.show() : this.close();
    }

    show() {
        if (this.popoversEl && this.state == 0) {
            this.popoversEl.classList.add('show');
            document.body.appendChild(this.popoversEl);
            this.state = 1;
            this.tether = new Tether({
                element: this.popoversEl,
                target: this.el.nativeElement,
                attachment: this.pAttachment[this.placement][0],
                targetAttachment: this.pAttachment[this.placement][1],
            });
        }
    }

    close() {
        if (this.popoversEl && this.state == 1) {
            this.state = -1;
            this.popoversEl.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(this.popoversEl);
                this.tether && this.tether.destroy();
                this.state = 0;
            }, 150);
        }
    }

    initPopovers() {
        if (!this.content) return;
        let popoversEl = this.popoversEl = document.createElement('div');
        popoversEl.classList.add(...this.pClass[this.placement]);
        if (this.title) {
            let titleEl = this.titleEl = document.createElement('h3');
            titleEl.classList.add('popover-title');
            titleEl.innerHTML = this.title;
            popoversEl.appendChild(titleEl);
        }
        let contentEl = this.contentEl = document.createElement('div');
        contentEl.classList.add('popover-content');

        if (this.content instanceof TemplateRef) {
            this.viewContainerRef.createEmbeddedView(this.content);
        } else {
            contentEl.innerHTML = this.content;
        }
        popoversEl.appendChild(contentEl);
    }

    private pAttachment = {
        top: [
            'bottom center',
            'top center'
        ],
        bottom: [
            'top center',
            'bottom center'
        ],
        left: [
            'middle right',
            'middle left'
        ],
        right: [
            'middle left',
            'middle right'
        ]

    };

    private top: string[] = [
        'popover',
        'fade',
        'bs-tether-element',
        'bs-tether-abutted',
        'bs-tether-abutted-top',
        'bs-tether-target-attached-top',
        'bs-tether-element-attached-bottom',
        'bs-tether-element-attached-center',
        'bs-tether-target-attached-center',
    ];

    private bottom: string[] = [
        'popover',
        'fade',
        'bs-tether-element',
        'bs-tether-abutted',
        'bs-tether-element-attached-top',
        'bs-tether-element-attached-center',
        'bs-tether-target-attached-bottom',
        'bs-tether-target-attached-center',
    ];

    private left: string[] = [
        'popover',
        'fade',
        'bs-tether-element',
        'bs-tether-enabled',
        'bs-tether-abutted',
        'bs-tether-abutted-left',
        'bs-tether-target-attached-left',
        'bs-tether-element-attached-right',
        'bs-tether-element-attached-middle',
        'bs-tether-target-attached-middle',
    ];

    private right: string[] = [
        'popover',
        'fade',
        'bs-tether-element',
        'bs-tether-enabled',
        'bs-tether-target-attached-right',
        'bs-tether-element-attached-left',
        'bs-tether-element-attached-middle',
        'bs-tether-target-attached-middle',
    ];

    private pClass = {
        top: this.top,
        bottom: this.bottom,
        left: this.left,
        right: this.right
    }
}


