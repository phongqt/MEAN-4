import { Injectable } from '@angular/core';

@Injectable()
export class CookieProvider {
    set(key, value, days) {
        var expires, date;
        if (days) {
            date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        else expires = "";
        document.cookie = key + "=" + value + expires + "; path=/";
    }

    get(key) {
        var nameEQ = key + "=", ca = document.cookie.split(';'),
            len = ca.length,
            i, c;

        for (i = 0; i < len; ++i) {
            c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
        }

        nameEQ = key = ca = i = c = len = null;
        return null;
    }
}