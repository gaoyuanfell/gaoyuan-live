import {
    BrowserXhr,
    Request,
    Response,
    ResponseOptions,
    XHRBackend,
    XHRConnection,
    XSRFStrategy,
} from '@angular/http';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { baseUrl } from "config";

export class HttpXHRBackend extends XHRBackend {
    constructor(
        private browserXHR: BrowserXhr,
        private baseResponseOptions: ResponseOptions,
        private xsrfStrategy: XSRFStrategy,
    ) {
        super(browserXHR, baseResponseOptions, xsrfStrategy);
    }

    createConnection(request: Request): XHRConnection {
        request.url = baseUrl + request.url;
        let token = window.localStorage.getItem("X-Token");
        token && request.headers.append("X-Token", token);
        let xhrConnection = super.createConnection(request);
        xhrConnection.response = xhrConnection.response.catch((error) => {
            return Observable.throw(error || "Server Error");
        });
        xhrConnection.response = xhrConnection.response.map((data: Response) => {
            try {
                let token = data.headers.get("X-Token");
                token && window.localStorage.setItem("X-Token", token);
                return data.json();
            } catch (e) {
                return data.text();
            }
        });
        return xhrConnection;
    }
}
