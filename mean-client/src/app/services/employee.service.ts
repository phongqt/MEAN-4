import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from "RxJS/Rx";
import { Employee } from '../models/employee';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmployeeService {
    constructor(private http: Http) {

    }

    getEmployeeList() {
        return this.http.get('http://localhost:4500/api');
    }

    getEmployeeById(id) {
        return this.http.get('http://localhost:4500/api/employ/' + id).toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}   