import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private authServiceRef: AuthService;
    constructor(private authService: AuthService) {
        this.authServiceRef = authService;
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.authServiceRef.isLoggedIn()) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.authServiceRef.getStoredSessionData().id)
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
