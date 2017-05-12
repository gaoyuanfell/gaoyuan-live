import {Injectable} from '@angular/core';

@Injectable()
export class ModalService {

    constructor() {
    }

    private _zIndex: number = 1050;
    private modalList: number[] = [];

    hasModal() {
        return this.modalList.length == 0;
    }

    getZIndex() {
        this._zIndex += 1;
        this.modalList.push(this._zIndex);
        return this._zIndex
    }

    getLength(): number {
        return this.modalList.length;
    }

    delModal() {
        this.modalList.pop()
    }
}
