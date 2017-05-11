import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { RequestProvider } from '../providers/request.provider';

@Injectable()
export class EmployeeService {
    constructor(private requestProvider: RequestProvider) {

    }

    getEmployeeList(page, limit) {
        return this.requestProvider.get('/employ?page=' + page + '&limit=' + limit);
    }

    getEmployeeById(id) {
        return this.requestProvider.get('/employ/' + id);
    }

    updateEmployee(id, data) {
        return this.requestProvider.put('/employ/' + id, data);
    }

    addEmployee(data) {
        return this.requestProvider.post('/employ/', data);
    }

    deleteEmployee(id) {
        return this.requestProvider.delete('/employ/' + id);
    }
}   