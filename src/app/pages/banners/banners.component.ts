import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { API_LIST } from '../../services/web-api/api-list';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {
  authServiceRef: AuthService;
  origin: string;
  bannerStyles: BannerStyle[] = [];

  copyCodeToClipboard(elem) {
    try {
      elem.select();
      document.execCommand('Copy');
    } catch (err) {
      alert('Your browser does not support this feature. Try copying it using other methods.');
      throw new Error('Your browser does not support automatic \'Copy\' command.');
    }
  }
  constructor(
    authService: AuthService,
    private httpClient: HttpClient
  ) {
    this.authServiceRef = authService;
    this.origin = window.location.origin;
    if (this.authServiceRef.user != null) {
      this.callForBanners(this.authServiceRef.user.refer_url_id);
    } else {
        this.authServiceRef.requestCurrentSessionDataObs.subscribe((user) => {
          setTimeout(() => {
            this.callForBanners(user.refer_url_id);
          });
      });
    }
  }

  ngOnInit() {
  }
  callForBanners(referral_id: string) {
    this.httpClient.get(
      API_LIST.banners + '?referral_link=' + this.origin + '/invite/' + referral_id
    ).subscribe((data: any) => {
      this.bannerStyles = data;
      this.bannerStyles.forEach((bannerStyle, i) => {
        bannerStyle.vars = new BannerVars();
      });
    });
  }
}


class BannerStyle {
  banners: Banner[] = [];
  name = '';
  preview_image = '';
  vars: BannerVars ;
}

class Banner {
  type = '';
  code = '';
}

class BannerVars {
  selectedBannerIndex = 0;
}

