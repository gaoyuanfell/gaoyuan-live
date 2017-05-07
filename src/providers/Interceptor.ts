import {
    BrowserXhr,
    ResponseOptions,
    XHRBackend,
    XSRFStrategy
} from '@angular/http';
import {HttpXHRBackend} from './httpInterceptor';
import {Provider} from "@angular/core";

export function $httpInterceptor(_browserXHR: BrowserXhr, _baseResponseOptions: ResponseOptions, _xsrfStrategy: XSRFStrategy) {
    return new HttpXHRBackend(_browserXHR, _baseResponseOptions, _xsrfStrategy)
}

const httpInterceptor = {
    provide: XHRBackend,
    useFactory: $httpInterceptor,
    deps: [BrowserXhr, ResponseOptions, XSRFStrategy]
}

export {httpInterceptor}
