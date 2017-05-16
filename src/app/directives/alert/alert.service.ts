import {Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, Injector, Input, Renderer2, ViewContainerRef, ViewRef} from "@angular/core";

export class ContentRef {
    constructor(public nodes: any[], public viewRef?: ViewRef, public componentRef?: ComponentRef<any>) {
    }
}

@Component({
    selector: 'alert-window',
    host: {
        '[class]': '"alert-" + type'
    },
    template: `
        <div [class]="'alert alert-dismissible alert-' + type">
            <button type="button" class="close">
                <span aria-hidden="true">&times;</span>
            </button>
            {{content}}
        </div>
    `
})
export class AlertWindow {
    @Input() content: string;
    @Input() type: string = 'success';
}

export class AlertService<T> {
    private _windowFactory: ComponentFactory<T>;
    private _windowRef: ComponentRef<T>;
    private _contentRef: ContentRef;

    constructor(type: any, private _injector: Injector, private _viewContainerRef: ViewContainerRef, private _renderer: Renderer2, componentFactoryResolver: ComponentFactoryResolver) {
        this._windowFactory = componentFactoryResolver.resolveComponentFactory<T>(type);
    }

    open(content: string) {
        if (!this._windowRef) {
            this._contentRef = this._getContentRef(content);
            this._windowRef = this._viewContainerRef.createComponent(this._windowFactory, 0, this._injector, this._contentRef.nodes);
            return this._windowRef;
        }
    }

    close() {
        if (this._windowRef) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._windowRef.hostView));
            this._windowRef = null;

            if (this._contentRef.viewRef) {
                this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
                this._contentRef = null;
            }
        }
    }

    private _getContentRef(content: string): ContentRef {
        if (!content) {
            return new ContentRef([]);
        } else {
            return new ContentRef([[this._renderer.createText(`${content}`)]]);
        }
    }
}

@Directive({
    selector: '[ngmAlert]',
    exportAs: 'ngmAlert'
})
export class AlertDirective {
    private _alertService: AlertService<AlertWindow>;
    private _windowRef: ComponentRef<AlertWindow>;

    constructor(private _renderer: Renderer2, injector: Injector, componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        this._alertService = new AlertService<AlertWindow>(AlertWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);
    }

    @Input('a-content') content: string;
    @Input('a-type') type: string;
    @Input('a-time') time: number = 2000;
    private _time;

    open() {
        if (!this._windowRef) {
            this._windowRef = this._alertService.open(this.content);
            this._windowRef.instance.content = this.content;
            this._windowRef.instance.type = this.type;

            this._time = setTimeout(() => {
                this.close();
            }, this.time);
        }else{
            this.close();
            this.open();
        }
    }

    close() {
        clearTimeout(this._time);
        this._windowRef = null;
        this._alertService.close();
    }
}
