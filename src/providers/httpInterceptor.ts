import {
    BaseRequestOptions,
    BrowserXhr,
    Connection,
    ConnectionBackend,
    Headers,
    Http,
    ReadyState,
    Request,
    RequestMethod,
    RequestOptions,
    RequestOptionsArgs,
    Response,
    ResponseOptions,
    XHRBackend,
    XHRConnection,
    XSRFStrategy,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';


export class HttpXHRBackend extends XHRBackend {
    constructor(
        browserXHR: BrowserXhr,
        baseResponseOptions: ResponseOptions,
        xsrfStrategy: XSRFStrategy,
    ) {
        super(browserXHR, baseResponseOptions, xsrfStrategy);
    }

    createConnection(request: Request): XHRConnection {
        let xhrConnection = super.createConnection(request);
        xhrConnection.response = xhrConnection.response.catch((error) => {
            return Observable.throw(error || "Server Error");
        });
        xhrConnection.response = xhrConnection.response.map((data: Response) => {
            try {
                return data.json();
            } catch (e) {
                return data.text();
            }
        });
        return xhrConnection;
    }
}
