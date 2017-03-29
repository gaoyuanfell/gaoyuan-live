import {
    BrowserXhr,
    ResponseOptions,
    XHRBackend,
    XSRFStrategy
} from '@angular/http';
import { HttpXHRBackend } from './httpInterceptor';
import { Provider } from "@angular/core";

let Interceptor: Provider[] = [
    {
        provide: XHRBackend,
        useFactory: (_browserXHR: BrowserXhr, _baseResponseOptions: ResponseOptions, _xsrfStrategy: XSRFStrategy) => { return new HttpXHRBackend(_browserXHR, _baseResponseOptions, _xsrfStrategy) },
        deps: [BrowserXhr, ResponseOptions, XSRFStrategy]
    }
]

export { Interceptor }
