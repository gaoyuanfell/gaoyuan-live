import { DomHandler } from '../dom/domhandler';
import { CommonModule } from '@angular/common';
import { ease } from '../animation/animation';
import {
    AfterViewInit,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    NgModule,
    OnDestroy,
    Output,
    Renderer,
    ViewChild,
    AfterViewChecked
} from '@angular/core';

@Component({
    selector:'app-dialog',
    styleUrls:['./dialog.css'],
    templateUrl:'./dialog.html',
    animations:[ease],
    providers:[DomHandler]
})
export class Dialog implements AfterViewInit, AfterViewChecked, OnDestroy {
    
    @Input() header: string;

    @Input() draggable: boolean = true;

    @Input() resizable: boolean = true;
    
    @Input() minWidth: number = 150;

    @Input() minHeight: number = 150;

    @Input() width: any;

    @Input() height: any;
    
    @Input() contentHeight: any;

    @Input() modal: boolean;

    @Input() closeOnEscape: boolean = true;

    @Input() rtl: boolean;

    @Input() closable: boolean = true;

    @Input() responsive: boolean;
    
    @Input() appendTo: any;
    
    @Input() style: any;
        
    @Input() styleClass: string;

    @ViewChild('container') containerViewChild: ElementRef;
    
    @ViewChild('content') contentViewChild: ElementRef;

    @ViewChild('ok') okBtnViewChild: ElementRef;

    @ViewChild('no') noBtnViewChild: ElementRef;

    @Output() onBeforeShow: EventEmitter<any> = new EventEmitter();

    @Output() onAfterShow: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeHide: EventEmitter<any> = new EventEmitter();

    @Output() onAfterHide: EventEmitter<any> = new EventEmitter();

    @Output() visibledChange:EventEmitter<any> = new EventEmitter();

    @Output() okChange:EventEmitter<any> = new EventEmitter();

    @Output() noChange:EventEmitter<any> = new EventEmitter();
    
    _visibled: boolean;

    _ok:number;
    _no:number;
    
    dragging: boolean;

    resizing: boolean;

    documentDragListener: any = () => {};

    documentResizeListener: any = () => {};
    
    documentResizeEndListener: any = () => {};
    
    documentResponsiveListener: any = () => {};
    
    documentEscapeListener: any = () => {};

    documentOkListener: any = () => {};

    documentNoListener: any = () => {};
    
    lastPageX: number;
    
    lastPageY: number;
    
    mask: HTMLDivElement;
    
    shown: boolean;
    
    okViewChild: HTMLDivElement;

    noViewChild: HTMLDivElement;

    container: HTMLDivElement;
    
    contentContainer: HTMLDivElement;
    
    positionInitialized: boolean;
    
    constructor(public el: ElementRef,private domHandler:DomHandler,private renderer:Renderer){}

    @Input() get visibled(): boolean {
        return this._visibled;
    }

    set visibled(val:boolean) {
        console.info(val);
        this._visibled = val;
        
        if(this._visibled) {
            this.onBeforeShow.emit({});
            this.shown = true;
        } 
        
        if(this.modal && !this._visibled) {
            this.disableModality();
        }
    }

    set ok(val:number){
        this._ok = val;
    }
    set no(val:number){
        this._no = val;
    }

    show() {
        if(!this.positionInitialized) {
            this.center();
            this.positionInitialized = true;
        }
        
        this.container.style.zIndex = String(++DomHandler.zindex);
        
        if(this.modal) {
            this.enableModality();
        }
    }
    
    ngAfterViewInit() {
        
        this.container = <HTMLDivElement> this.containerViewChild.nativeElement;
        this.contentContainer =  <HTMLDivElement> this.contentViewChild.nativeElement;
        this.okViewChild = <HTMLDivElement> this.okBtnViewChild.nativeElement;
        this.noViewChild = <HTMLDivElement> this.noBtnViewChild.nativeElement;

            
        this.documentOkListener = this.renderer.listen(this.okViewChild,'click',(event) => {
            this.okChange.emit(false);
        })

        this.documentNoListener = this.renderer.listen(this.noViewChild,'click',(event) => {
            this.noChange.emit(false);
        })

        if(this.draggable) {
            this.documentDragListener = this.renderer.listenGlobal('body', 'mousemove', (event) => {
                event.preventDefault();
                this.onDrag(event);
            });
        }
        
        if(this.resizable) {
            this.documentResizeListener = this.renderer.listenGlobal('body', 'mousemove', (event) => {
                event.preventDefault();
                this.onResize(event);
            });
            
            this.documentResizeEndListener = this.renderer.listenGlobal('body', 'mouseup', (event) => {
                event.preventDefault();
                if(this.resizing) {
                    this.resizing = false;
                }
            });
        }
        
        if(this.responsive) {
            this.documentResponsiveListener = this.renderer.listenGlobal('window', 'resize', (event) => {
                this.center();
            });
        }
        
        if(this.closeOnEscape && this.closable) {
            this.documentEscapeListener = this.renderer.listenGlobal('body', 'keydown', (event) => {
                if(event.which == 27) {
                    if(parseInt(this.container.style.zIndex) == DomHandler.zindex) {
                        this.hide(event);
                    }
                }
            });
        }
        
        if(this.appendTo) {
            if(this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                this.domHandler.appendChild(this.container, this.appendTo);
        }
    }
    
    ngAfterViewChecked() {
        if(this.shown) {
            this.show();
            this.onAfterShow.emit({});
            this.shown = false;
        }
    }
    
    center() {
        let elementWidth = this.domHandler.getOuterWidth(this.container);
        let elementHeight = this.domHandler.getOuterHeight(this.container);
        if(elementWidth == 0 && elementHeight == 0) {
            this.container.style.visibility = 'hidden';
            this.container.style.display = 'block';
            elementWidth = this.domHandler.getOuterWidth(this.container);
            elementHeight = this.domHandler.getOuterHeight(this.container);
            this.container.style.display = 'none';
            this.container.style.visibility = 'visible';
        }
        let viewport = this.domHandler.getViewport();
        let x = (viewport.width - elementWidth) / 2;
        let y = (viewport.height - elementHeight) / 2;

        this.container.style.left = x + 'px';
        this.container.style.top = y + 'px';
    }
    
    enableModality() {
        if(!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.container.style.zIndex) - 1);
            this.domHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-dialog-mask');
            document.body.appendChild(this.mask);
        }
    }
    
    disableModality() {
        if(this.mask) {
            document.body.removeChild(this.mask);
            this.mask = null;
        }
    }
    
    hide(event) {
        console.info(event);
        // this.onBeforeHide.emit(event);
        // this.visibledChange.emit(false);
        this._visibled = false;
        // this.onAfterHide.emit(event);
        event.preventDefault();
    }
    
    moveOnTop() {
        this.container.style.zIndex = String(++DomHandler.zindex);
    }
    
    initDrag(event) {
        event.preventDefault();
        if(this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    
    onDrag(event) {
        event.preventDefault();
        if(this.dragging) {
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let leftPos = parseInt(this.container.style.left);
            let topPos = parseInt(this.container.style.top);

            this.container.style.left = leftPos + deltaX + 'px';
            this.container.style.top = topPos + deltaY + 'px';
            
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    
    endDrag(event) {
        event.preventDefault();
        if(this.draggable) {
            this.dragging = false;
        }
    }
    
    initResize(event) {
        event.preventDefault();
        if(this.resizable) {
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    
    onResize(event) {
        event.preventDefault();
        if(this.resizing) {
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let containerWidth = this.domHandler.getOuterWidth(this.container);
            let contentHeight = this.domHandler.getHeight(this.contentContainer);
            let newWidth = containerWidth + deltaX;
            let newHeight = contentHeight + deltaY;

            if(newWidth > this.minWidth)
                this.container.style.width = newWidth + 'px';
                
            if(newHeight > this.minHeight)
                this.contentContainer.style.height = newHeight + 'px';
            
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    
    ngOnDestroy() {
        
        this.disableModality();
        
        if(this.documentDragListener) {
            this.documentDragListener();
        }
        
        if(this.resizable) {
            this.documentResizeListener();
            this.documentResizeEndListener();
        }
        
        if(this.responsive) {
            this.documentResponsiveListener();
        }
        
        if(this.closeOnEscape && this.closable) {
            this.documentEscapeListener();
        }
        
        if(this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Dialog],
    declarations: [Dialog]
})
export class DialogModule {  }