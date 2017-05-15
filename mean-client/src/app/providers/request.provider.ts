import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from "RxJS/Rx";
import { CookieProvider } from "../providers/cookie.provider";

@Injectable()
export class RequestProvider {

    private api: string = "http://localhost:4500/api";
    private headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

    constructor(private http: Http, private cookieProvider: CookieProvider, private options: RequestOptions) {
    }

    createAuthorizationHeader() {
        this.headers.append('Authorization', this.cookieProvider.get('token'));
    }

    get(url: String) {
        this.createAuthorizationHeader();

        return this.http.get(this.api + url, { "headers": this.headers }).toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    post(url: String, data: any) {
        this.createAuthorizationHeader();
        return this.http.post(this.api + url, JSON.stringify(data), { headers: this.headers }).toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    put(url: String, data) {
        this.createAuthorizationHeader();
        return this.http.put(this.api + url, JSON.stringify(data), { headers: this.headers }).toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    delete(url: String) {
        this.createAuthorizationHeader();
        return this.http.delete(this.api + url, { headers: this.headers }).toPromise()
            .then(response => response.json())
            .catch(this.handleError);;
    }

    private handleError(error: any): Promise<any> {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}