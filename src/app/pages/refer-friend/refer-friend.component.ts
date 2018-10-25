import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-refer-friend',
  templateUrl: './refer-friend.component.html',
  styleUrls: ['./refer-friend.component.css']
})
export class ReferFriendComponent implements OnInit {
  origin = window.location.origin;
  authServiceRef: AuthService;
  constructor(authService: AuthService) {
    this.authServiceRef = authService;
  }

  ngOnInit() {
  }
  copyLinkToClipboard(elem) {
    try {
      elem.select();
      document.execCommand('Copy');
    } catch (err) {
      alert('Your browser does not support this feature. Try copying it using other methods.');
      throw new Error('Your browser does not support automatic \'Copy\' command.');
    }
  }
}
