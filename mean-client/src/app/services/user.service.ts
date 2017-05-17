import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { RequestProvider } from '../providers/request.provider';

@Injectable()
export class UserService {
    constructor(private requestProvider: RequestProvider) {

    }

    login(data) {
        return this.requestProvider.post('/authenticate', data);
    }

    addUser(data) {
        return this.requestProvider.post('/user', data);
    }

    getProfile() {
        return this.requestProvider.get('/profile');
    }
}