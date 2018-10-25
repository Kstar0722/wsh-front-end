import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserTrackingService } from '../../services/user-tracking/user-tracking.service';

@Component({
  selector: 'app-header-account-info',
  templateUrl: './header-account-info.component.html',
  styleUrls: ['./header-account-info.component.css']
})
export class HeaderAccountInfoComponent implements OnInit {
  expanded: boolean = false;
  authServiceRef: AuthService;
  selectedOffer: string = null;
  constructor(authService: AuthService, route: ActivatedRoute, private userTrackingService: UserTrackingService) {
    this.authServiceRef = authService;
    this.selectedOffer = route.snapshot.queryParams.selected_offer;
  }
  toggle(){
    if(this.authServiceRef.user){
      this.expanded = !this.expanded;
    }
  }
  logout(){
    this.userTrackingService.createScript1(null, null, null, null);
    this.authServiceRef.deleteSessionDataAndRedirect();
  }
  ngOnInit() {
  }

}
