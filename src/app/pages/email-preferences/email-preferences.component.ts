import { Component, OnInit } from '@angular/core';
import { API_LIST } from '../../services/web-api/api-list';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-email-preferences',
  templateUrl: './email-preferences.component.html',
  styleUrls: ['./email-preferences.component.css']
})
export class EmailPreferencesComponent implements OnInit {

  isLoading = false;
  formFields = {};
  errors: string[] = [];
  showUpdateSuccessfullMsg = false;
  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.initFields();
  }
  objectKeys(obj) {
    return Object.keys(obj);
  }

  showUpdateSuccessfullMsgCall() {
    this.showUpdateSuccessfullMsg = true;
    setTimeout(() => {
      this.showUpdateSuccessfullMsg = false;
    }, 5000);
  }
  initFields() {
    this.isLoading = true;
    // get available fields for the form
    this.httpClient.get(API_LIST.getAvailableNotifications).subscribe((data: any) => {
      data.forEach(field => {
        this.formFields[field.key] = {key: field.key, name: field.name, active: false};
      });
      // check and set active notifications
      this.authService.requestCurrentSessionDataObs.subscribe(
        (user) => {
          this.objectKeys(this.authService.user.notifications).forEach((key, i) => {
            this.formFields[this.authService.user.notifications[key]].active = true;
          });
          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
          if (err.status === 400) {
            this.errors.push(err.error.string);
          } else if (err.status === 422) {
            err.error.errors.forEach(error => {
              this.errors.push(error.field + ': ' + error.message);
            });
          }
        }
      );
    });
  }

  saveFields() {
    this.isLoading = true;
    const notificationsArr = [];
    this.objectKeys(this.formFields).forEach((key, i) => {
      if (this.formFields[key].active) {
        notificationsArr.push(key);
      }
    });
    this.httpClient.patch(API_LIST.updateNotifications, {'notifications': notificationsArr}).subscribe(
      () => {
        this.isLoading = false;
        this.showUpdateSuccessfullMsgCall();
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }


  onSubmit(f) {
    this.saveFields();
  }
  ngOnInit() {
  }

}
