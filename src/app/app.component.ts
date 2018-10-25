import { Component } from '@angular/core';
import { PageTplDataService, PageTplDataModel } from './services/page-tpl-data/page-tpl-data.service';
import * as $ from 'jquery';
import {
  Router, ActivatedRoute, NavigationEnd, ActivationEnd, ChildActivationEnd, ResolveEnd,
  RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { Meta } from '@angular/platform-browser';
import { UserTrackingService } from './services/user-tracking/user-tracking.service';
import { ConfigService } from './services/config/config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  selectedOfferParam: string = null;
  public pageTplData: PageTplDataModel;
  pageTplDataService: PageTplDataService;
  authServiceRef: AuthService;
  firstTimeLaunched = false;
  constructor(
    pageTplDataService: PageTplDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    authService: AuthService,
    userTrackingService: UserTrackingService,
    private configService: ConfigService
  ) {
    userTrackingService.appendHeadScripts();

    this.pageTplData = pageTplDataService.pageTplData;
    this.authServiceRef = authService;
    // find active route data
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.firstTimeLaunched = true;

        const routeSnapshot: ActivatedRouteSnapshot[] = [];
        const activeRoutes: ActivatedRoute[] = activatedRoute.children;

        activeRoutes.forEach((route: ActivatedRoute) => {
            let activeRoute: ActivatedRoute = route;
            while (activeRoute.firstChild) {
                activeRoute = activeRoute.firstChild;
            }
            routeSnapshot.push(activeRoute.snapshot);
        });
        // save data for later use in other components
        this.pageTplDataService = pageTplDataService;
        pageTplDataService.setPageTitle(routeSnapshot[0].data.pageTitle);
        pageTplDataService.setPageClass(routeSnapshot[0].data.pageClass);

        // if active session is found or external login requested, init user data
        if (routeSnapshot[0].queryParams.user_session !== undefined ) {
          this.authServiceRef.deleteSessionData();
          if (event.url.indexOf('/login') !== 0) {
            router.navigate(
              ['/login'],
              {
                queryParams: {
                  // user_session:routeSnapshot[0].queryParams.user_session,
                  redirect_url: event.url.split('?')[0],
                  qParams: encodeURIComponent(event.url.split('?')[1])
                },
                queryParamsHandling: 'merge'
              }
            );
          }
        } else {
          if (authService.isLoggedIn() && authService.user == null) {
            authService.requestCurrentSessionDataObs.subscribe();
          }
        }

        this.selectedOfferParam = routeSnapshot[0].queryParams.selected_offer;
      }
    });
  }
}
