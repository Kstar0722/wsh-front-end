import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ActivateIfLoggedIn implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if ( this.authService.isLoggedIn() ) {
            return true;
        } else {
            const queryParams: any = new Object();
            queryParams.redirect_url =  encodeURIComponent(state.url.split('?')[0]);
            if (state.url.split('?').length === 2) {
                queryParams.qParams = encodeURIComponent(state.url.split('?')[1]);
            }
            // Object.assign(queryParams, route.queryParams);
            this.router.navigate(['/login'], { queryParams: queryParams});
            return false;
        }
    }
    canActivateChild() {
        if ( this.authService.isLoggedIn() ) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}

@Injectable()
export class ActivateIfNotLoggedIn implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate() {
        if ( !this.authService.isLoggedIn() ) {
            return true;
        } else {
            this.router.navigate(['/dashboard']);
            return false;
        }
    }
    canActivateChild() {
        if ( !this.authService.isLoggedIn() ) {
            return true;
        } else {
            this.router.navigate(['/dashboard']);
            return false;
        }
    }
}
