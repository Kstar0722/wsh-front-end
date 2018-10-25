import { Component, OnInit } from '@angular/core';
import { DisableableFields } from '../../components/update-user-form/update-user-form.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  disabledFields: DisableableFields = {
    // birthDate: true
  };
  showUpdateSuccessfullMsg = false;
  showUpdateSuccessfullMsgCall(event) {
    if (event.updated) {
      this.showUpdateSuccessfullMsg = true;
      setTimeout(() => {
        this.showUpdateSuccessfullMsg = false;
      }, 5000);
    }
  }
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
