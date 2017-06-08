import {Component, OnInit} from '@angular/core';
import {LineService} from "../../service/line.service";
import {Line, Page, Result, User} from "../model";
import {$Storage} from "../storage";
import {Router} from "@angular/router";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.less'],
    providers: [LineService]
})
export class IndexComponent implements OnInit {
    page: Page<any> = {
        pageSize: 10
    };
    lineList: Line[] = [];
    user: User = $Storage('user');

    constructor(private lineService: LineService, private router: Router) {
    }

    ngOnInit() {
        this.getLineList();
    }

    go(id, lineId) {
        this.router.navigate(['/line', id], {queryParams: {lineId: lineId, id: id}})
    }

    getLineList() {
        this.lineService.linePageAllData({...this.page}).subscribe((data: Result<Page<Line>>) => {
            if (data.code == 200) {
                this.lineList = data.doc.list;
            }
        })
    }

    addPraised(line) {
        this.lineService.addPraised({id: line.id}).subscribe((data: Result<any>) => {
            if (data.code == 200) {
                if (data.doc) {
                    line.isPraised = 0;
                    --line.praised;
                } else {
                    line.isPraised = 1;
                    ++line.praised;
                }
            }
        })
    }

}
