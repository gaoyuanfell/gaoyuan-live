import {UserService} from './../../service/user.service';
import {LineService} from './../../service/line.service';
import {User, Line, Result, Page} from '../model';
import {ActivatedRoute, Router, Data} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import {Http} from '@angular/http';
import {Component, OnInit} from '@angular/core';
import {$Storage} from '../storage';

@Component({
    selector: 'app-line',
    templateUrl: './line.component.html',
    styleUrls: ['./line.component.scss'],
    providers: [LineService, UserService]
})
export class LineComponent implements OnInit {
    userId: number;
    line: Line = {};
    user: User = $Storage('user');
    // userList: User[] = [];
    lineList: Line[] = [];
    page: Page<any> = {
        pageSize: 50
    };

    constructor(private router: Router, private route: ActivatedRoute, private lineService: LineService, private userService: UserService) {
    }

    ngOnInit() {
        // this.getUserList();
        this.getLineList();
        this.userId = this.user.id;
    }

    go(id, lineId) {
        this.router.navigate(['/line', id], {queryParams: {lineId: lineId, id: id}})
    }

    delete(id, i) {
        this.lineService.delete({id: id}).subscribe((data: Result<any>) => {
            if (data.code == 200) {
                console.info(data)
                this.lineList.splice(i, 1);
            }
        })
    }

    // getUserList() {
    //     this.userService.userList().subscribe((data: Result<User[]>) => {
    //         if (data.code == 200) {
    //             this.userList = data.doc;
    //         }
    //     })
    // }

    getLineList() {
        this.lineService.linePage({...this.page}).subscribe((data: Result<Page<Line>>) => {
            if (data.code == 200) {
                this.lineList = data.doc.list;
            }
        })
    }

    addLineSubmit() {
        this.lineService.insert(this.line).subscribe((data: Result<Line>) => {
            if (data.code == 200) {
                this.line.id = data.doc.id
                this.lineList.push(this.line);
                this.line = {};
            }
        })
    }

}
