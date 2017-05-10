import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from "RxJS/Rx";
import { Employee } from '../models/employee';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmployeeService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private url: string = "http://localhost:4500/api/";

    constructor(private http: Http) {

    }

    getEmployeeList() {
        return this.http.get(this.url);
    }

    getEmployeeById(id) {
        return this.http.get(this.url + 'employ/' + id).toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    updateEmployee(id, data) {
        return this.http.put(this.url + 'employ/' + id, JSON.stringify(data), {headers: this.headers}).toPromise()
            .then(response => response.json())
            .catch(this.handleError);;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}   