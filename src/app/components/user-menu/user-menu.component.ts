import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { TouchService } from '../../services/touch/touch.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  userSubscribed = false;
  groups = [
    {
      heading: {
        label: 'Dashboard',
        iconName: 'home',
        route: '/dashboard',
        expanded: false
      },
      items: [
        {
          label: 'My Dashboard',
          route: '/dashboard',
          showOnlyIfSubscribed: false
        },
        // {
        //   label: 'My tickets',
        //   route: '/my-tickets',
        //   showOnlyIfSubscribed: false
        // },
        // {
        //   label: 'My syndicates',
        //   route: '/my-syndicates',
        //   showOnlyIfSubscribed: false
        // },
        {
          label: 'My results',
          route: '/my-results',
          showOnlyIfSubscribed: false
        },
        {
          label: 'My balance',
          route: '/my-balance',
          showOnlyIfSubscribed: false
        }
      ]
    },
    {
      heading: {
        label: 'Refer a friend',
        iconName: 'user-plus',
        route: '/refer-a-friend',
        expanded: false
      },
      items: [
        {
          label: 'Refer a friend',
          route: '/refer-a-friend',
          showOnlyIfSubscribed: false
        },
        {
          label: 'My referrals',
          route: '/my-referrals',
          showOnlyIfSubscribed: false
        }, {
          label: 'My bonuses',
          route: '/my-bonuses',
          showOnlyIfSubscribed: false
        }
      ]
    },
    {
      heading: {
        label: 'Account',
        iconName: 'user',
        route: '/account',
        expanded: false
      },
      items: [
        {
          label: 'My profile',
          route: '/my-profile',
          showOnlyIfSubscribed: false
        },
        {
          label: 'Change my password',
          route: '/change-password',
          showOnlyIfSubscribed: false
        },
        {
          label: 'Subscription plan',
          route: '/subscription-plan',
          showOnlyIfSubscribed: false
        },
        {
          label: 'Payment history',
          route: '/payment-history',
          showOnlyIfSubscribed: false
        },
        {
          label: 'Update payment card',
          route: '/update-payment-card',
          showOnlyIfSubscribed: true
        },
        {
          label: 'Email & SMS preferences',
          route: '/email-preferences',
          showOnlyIfSubscribed: false
        }
      ]
    }
  ];

  isMobile: boolean;

  constructor(private touchService: TouchService, private router: Router, private authService: AuthService) {
    this.isMobile = this.touchService.isAnyMobile();

    // useful for showing Update Card Link only if user is subscribed
    this.authService.requestCurrentSessionDataObs.subscribe((user) => {
      if (this.authService.isSubscribed()) {
        this.userSubscribed = true;
      } else {
        this.userSubscribed = false;
      }
    });
  }

  ngOnInit() {
  }
  expandGroup($event: MouseEvent, group: any) {
    $($event.target).closest('li').find('>ul').slideDown();
    setTimeout(() => {
      group.heading.expanded = true;
    });
  }
  collapseGroup($event: MouseEvent, group) {
    $($event.target).closest('li').find('>ul').slideUp();
    setTimeout(() => {
      group.heading.expanded = false;
    });
  }
  goToRoute(group) {
    if (group.heading.expanded) {
      // console.log(group.heading.route);
      this.router.navigate([group.heading.route]);
    }
    // if (this.isMobile && !group.heading.preventRouteOnMobile){
    // }
  }
}
