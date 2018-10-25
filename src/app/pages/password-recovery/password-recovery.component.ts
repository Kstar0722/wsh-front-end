import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  recoveryKeyParam = <string>null;
  recoveryInfo = null;
  inputEmail: string;
  inputPassword: string;

  errors: string[] = [];

  sendIsWaitingForResponse = false;
  infoIsWaitingForResponse = false;
  changeIsWaitingForResponse = false;
  recoverySendSuccess = false;
  recoveryInfoSuccess = false;
  changeSuccess = false;


  authServiceRef: AuthService;
  constructor(authService: AuthService, private route: ActivatedRoute) {
    this.authServiceRef = authService;
    this.recoveryKeyParam = route.snapshot.params.key === undefined ? null : route.snapshot.params.key;
    if (this.recoveryKeyParam) {
      this.getRecoveryInfo();
    }
  }

  triedSubmit = false;
  sendRecoveryMail(form) {
    this.triedSubmit = true;
    this.errors = [];
    if (form.valid) {
      this.sendIsWaitingForResponse = true;
      this.authServiceRef.sendPasswordRecoveryMail(this.inputEmail, window.location.href).subscribe(
        (JsonData) => {
          this.recoverySendSuccess = true;
          this.sendIsWaitingForResponse = false;
        },
        (err) => {
          this.recoverySendSuccess = false;
          this.sendIsWaitingForResponse = false;
          if (err.status === 400) {
            err.error.errors.forEach(element => {
              this.errors.push(element.field + ': ' + element.message);
            });
          }
        }
      );
    }
  }
  getRecoveryInfo() {
    this.errors = [];
    this.infoIsWaitingForResponse = true;
    this.authServiceRef.getPasswordRecoveryInfo(this.recoveryKeyParam).subscribe(
      (JsonData) => {
        this.recoveryInfo = JsonData;
        this.recoveryInfoSuccess = true;
        this.infoIsWaitingForResponse = false;
      },
      (err) => {
        console.log(err);
        this.infoIsWaitingForResponse = false;
        this.recoveryInfoSuccess = false;
        if (err.status === 404) {
          this.errors.push('Recovery key not found.');
        }
      }
    );
  }
  changePassword(key) {
    this.errors = [];
    this.changeIsWaitingForResponse = true;
    this.authServiceRef.changePassword(this.recoveryKeyParam, this.inputPassword).subscribe(
      (JsonData) => {
        this.recoveryInfo = JsonData;
        this.changeSuccess = true;
        this.changeIsWaitingForResponse = false;
        this.authServiceRef.deleteSessionData();
      },
      (err) => {
        this.changeIsWaitingForResponse = false;
        this.changeSuccess = false;
        if (err.status === 404) {
          this.errors.push('Recovery key not found.');
        }
        if (err.status === 400) {
          err.error.errors.forEach(element => {
            this.errors.push('General error occured.');
          });
        }
      }
    );
  }

  ngOnInit() {
  }

}
