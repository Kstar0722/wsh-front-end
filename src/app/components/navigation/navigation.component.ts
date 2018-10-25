import { Component, OnInit } from '@angular/core';
import { appRoutes } from '../../app.routes.module';
import { Route, Routes} from '@angular/router';
import { PageTplDataService } from '../../services/page-tpl-data/page-tpl-data.service';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  navObjects = [];
  public routes: Routes = appRoutes;
  public authServiceRef: AuthService;
  
  constructor(public pageTplDataService: PageTplDataService, authService: AuthService) { 
    this.authServiceRef = authService;
    appRoutes.forEach((route, i)=>{
      if (route.data && route.data.showInNav){
        if(!route.data.hideFromNavIfNotLoggedIn){
          this.pushRoute(this.navObjects, route, '/');
        }else{
          if (this.authServiceRef.isLoggedIn()) {
            this.pushRoute(this.navObjects, route, '/');
          }
        }
        
      }
    });
    
    //scroll to 0 when page changes (navigation renders again)
    window.scrollTo(0,0);

  }

  ngOnInit() {
  }

  pushRoute(navObjects: any, route:Route, prefixPath: string){
    navObjects.push({
      routerLink: prefixPath + route.path,
      pageTitle: route.data && route.data.pageTitle ? route.data.pageTitle : null
    });
    if(route.children != undefined && route.children.length > 0){
      this.scanForChildren(route, navObjects[this.navObjects.length-1]);
    }
  }
  scanForChildren(route: Route, navObjectsPath){
    route.children.forEach((childRoute, i)=>{

      if(navObjectsPath.children == undefined){
        navObjectsPath.children = [];
      }
      if (route.data && route.data.showInNav){
        if(!route.data.hideFromNavIfNotLoggedIn){
          this.pushRoute(navObjectsPath.children, childRoute, navObjectsPath.routerLink + '/');
        }else{
          if (this.authServiceRef.isLoggedIn()) {
            this.pushRoute(navObjectsPath.children, childRoute, navObjectsPath.routerLink + '/');
          }
        }
        
      }
      
    });
      
  }

}
