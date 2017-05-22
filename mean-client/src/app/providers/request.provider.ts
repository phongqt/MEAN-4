import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from "RxJS/Rx";
import { CookieProvider } from "../providers/cookie.provider";
import { LocalStorageProvider } from "../providers/localStorage.provider";

@Injectable()
export class RequestProvider {

    private api: string = "http://localhost:4500/api";

    constructor(private http: Http, private cookieProvider: CookieProvider, private options: RequestOptions,
        private localStorageProvider: LocalStorageProvider) {
    }

    createAuthorizationHeader(): Headers {
        return new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': this.cookieProvider.get("token") });
    }

    get(url: String) {
        let headers = this.createAuthorizationHeader();
        return this.http.get(this.api + url, { "headers": headers }).toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    post(url: String, data: any) {
        let headers = this.createAuthorizationHeader();
        return this.http.post(this.api + url, JSON.stringify(data), { headers: headers }).toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    put(url: String, data) {
        let headers = this.createAuthorizationHeader();
        return this.http.put(this.api + url, JSON.stringify(data), { headers: headers }).toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    delete(url: String) {
        let headers = this.createAuthorizationHeader();
        return this.http.delete(this.api + url, { headers: headers }).toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    uploadFile(url: String, data) {
        let headers = new Headers({ 'Authorization': this.cookieProvider.get("token") });
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // headers.append('Accept', 'application/json');
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api + url, data, { headers: headers }).toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}