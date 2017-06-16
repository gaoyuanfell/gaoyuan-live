import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
/**
 * Created by moka on 2017/6/16 0016.
 */
@Injectable()
export class HttpRequestService{
    constructor(private _http:Http){

    }
    baseUrl = 'http://192.168.100.170:8090/';

    login(body){
        return this._http.post(`${this.baseUrl}user/login.htm`,body)
    }

    insertUser(body){
        return this._http.post(`${this.baseUrl}user/insert.htm`,body)
    }
}
