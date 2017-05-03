import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UploadService {

    constructor(private http: Http) { }

    uploadPhoto(body = {}){
        return this.http.post('/upload/uploadPhoto.htm', body);
    }
}
