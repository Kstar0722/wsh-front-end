import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ExtraRenewalService } from '../../services/extra-renewal/extra-renewal.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-renewal-notify',
  templateUrl: './renewal-notify.component.html',
  styleUrls: ['./renewal-notify.component.scss']
})
export class RenewalNotifyComponent implements OnInit {

  renewal_flag = false;
  is_loading = false;
  constructor(
    private router: Router,
    private _extrarenewal: ExtraRenewalService
  ) { }

  ngOnInit() {
  }
  changeCard() {
    this.router.navigate(['/update-payment-card']);
  }
  cancelAutoRenewal() {
    this.is_loading = true;
    this._extrarenewal.cancelAutoRenewal().subscribe(
      (res) => {
        this.is_loading = false;
        this.renewal_flag = true;
      },
      (e: HttpErrorResponse) => {
      }
    );
  }
}
