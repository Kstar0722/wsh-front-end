import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }
  init(refId: string) {
    this.setLocalReferralId(refId, 14);
    this.authService.deleteSessionData();
    this.router.navigate(['/pricing']);
  }
  setLocalReferralId(refId: string, days: number) {
    const expDate = (new Date()).getTime();
    const obj = {expiration: expDate + (days * 24 * 60 * 60 * 1000), refId: refId};
    localStorage.setItem('referral', JSON.stringify(obj));
  }
  getLocalReferralId() {
    const currentDate = (new Date()).getTime();
    if (localStorage.getItem('referral') != null) {
      const obj = JSON.parse(localStorage.getItem('referral'));
      if (obj.expiration < currentDate) {
        return null;

      } else {
        return obj.refId;
      }
    } else {
      return null;
    }
  }
  removeLocalReferralId() {
    if (localStorage.getItem('referral') != null) {
      localStorage.removeItem('referral');
    }
  }
}
