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

    updateUser(id, data) {
        return this.requestProvider.put('/user/' + id, data);
    }

    getProfile() {
        return this.requestProvider.get('/profile');
    }

    getUserList(page, limit) {
        return this.requestProvider.get('/user?page=' + page + '&limit=' + limit);
    }

    getUserInfo(id) {
        return this.requestProvider.get('/user/' + id);
    }

    deleteUser(id) {
        return this.requestProvider.delete('/user/' + id);
    }
}