import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-change-my-password',
  templateUrl: './change-my-password.component.html',
  styleUrls: ['./change-my-password.component.css']
})
export class ChangeMyPasswordComponent implements OnInit {
  isLoading = false;
  errors = [];
  formFields = new FormFields();
  constructor(private authService: AuthService) { }

  triedSubmit = false;
  showUpdateSuccessfullMsg = false;

  showUpdateSuccessfullMsgCall() {
    this.showUpdateSuccessfullMsg = true;
    setTimeout(() => {
      this.showUpdateSuccessfullMsg = false;
    }, 5000);
  }

  onSubmit(form) {
    this.triedSubmit = true;
    this.errors = [];

    if (form.valid && this.formFields.newPassword === this.formFields.repeatNewPassword) {
      this.isLoading = true;
      this.authService.updatePassword(this.formFields.currentPassword, this.formFields.newPassword).subscribe(
        (data) => {
          this.isLoading = false;
          this.triedSubmit = false;
          this.formFields = new FormFields();
          this.showUpdateSuccessfullMsgCall();
        },
        (err) => {
          this.isLoading = false;
          this.triedSubmit = false;
          if (err.status === 400) {
            this.errors.push(err.error.string);
          } else if (err.status === 422) {
            err.error.errors.forEach(error => {
              this.errors.push(error.message);
            });
          }
        }
      );
    }
  }
  ngOnInit() {
  }

}
class FormFields {
  currentPassword = '';
  newPassword = '';
  repeatNewPassword = '';
}
