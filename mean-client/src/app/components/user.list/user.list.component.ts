import { UserService } from "../../services/user.service";
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { DetailsEmployeeComponent } from '../employee.details/employee.details.component';

@Component({
    moduleId: module.id,
    selector: 'user-list',
    templateUrl: 'user.list.component.html',

})
export class ListUserComponent implements OnInit {

    currentPage = 1;
    totalPage = 0;
    limit = 10;

    UserList = [];

    ngOnInit(): void {
        this.getList();
    }
    public constructor(private userService: UserService) {
    }

    private getList() {
        this.userService.getUserList(this.currentPage, this.limit)
            .then(res => {
                if (res.success) {
                    this.UserList = res.data.data;
                    this.totalPage = res.data.totalItems;
                }
            });
    }

    public deleteUser(item) {
        var result = confirm("Want to delete?");
        if (result) {
            this.userService.deleteUser(item._id)
                .then(res => {
                    if (res.success) {
                        this.getList();
                    }
                });
        }
    }

    public pageChange() {
        this.getList();
    }
}   