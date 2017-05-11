import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from "RxJS/Rx";

@Injectable()
export class RequestProvider { 
    private headers = new Headers({'Content-Type': 'application/json'});
    private api: string = "http://localhost:4500/api";

    constructor(private http: Http) {
    }

    get(url:String) {
       return this.http.get(this.api + url,  {headers: this.headers}).toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    post(url:String, data:any) {
        return this.http.post(this.api + url, JSON.stringify(data), {headers: this.headers}).toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    put(url:String, data) {
        return this.http.put(this.api + url, JSON.stringify(data), {headers: this.headers}).toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    delete(url: String) {
        return this.http.delete(this.api + url, {headers: this.headers}).toPromise()
            .then(response => response.json())
            .catch(this.handleError);;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}