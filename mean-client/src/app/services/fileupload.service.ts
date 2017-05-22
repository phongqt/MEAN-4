import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { RequestProvider } from '../providers/request.provider';

@Injectable()
export class FileUploadService {
    constructor(private requestProvider: RequestProvider) {

    }

    uploadAvatar(data) {
        return this.requestProvider.uploadFile('/avatar', data);
    }
}