import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlansService } from '../../services/plans/plans.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserTrackingService } from '../../services/user-tracking/user-tracking.service';
import { InviteService } from '../../services/invite/invite.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  plansServiceRef:PlansService;

  form: FormGroup;

  errors: string[] = [];

  formIsWaitingForResponse: boolean = false;

  externalToken: string = null;

  authServiceRef: AuthService;
  constructor(
    private authService: AuthService, 
    private router: Router, 
    public route: ActivatedRoute, 
    public plansService: PlansService,
    private formBuilder: FormBuilder, 
    private userTrackingService: UserTrackingService,
    private inviteService: InviteService
    ) {
    this.authServiceRef = authService;
    this.plansServiceRef = plansService;
    
    if (this.route.snapshot.queryParams.user_session != undefined){
      let params = JSON.parse(JSON.stringify(this.route.snapshot.queryParams));
      // console.log(params.user_session);
      this.loginWithToken(params.user_session, this.route.snapshot.queryParams['redirect_url'], params);
    }else{
      if(this.route.snapshot.queryParams.qParams != undefined){
        let user_session = this.router.parseUrl('?' + decodeURIComponent(this.route.snapshot.queryParams.qParams)).queryParamMap.get('user_session');
        if (user_session != null ) {
          let redirect_url = this.route.snapshot.queryParams['redirect_url'];
          let params = this.router.parseUrl('?' + decodeURIComponent(this.route.snapshot.queryParams.qParams)).queryParams;
          this.loginWithToken(user_session, redirect_url, params);
        }
      }
    }
  }

  loginWithToken(token, encoded_redirect_url, params){
    this.errors = [];
    this.formIsWaitingForResponse = true;
    
    this.authService.requestLogInWithToken(token).subscribe(
      (data)=>{
        this.formIsWaitingForResponse = false;
        this.authService.storeSessionData(data, false);
        this.authService.user = data.user;
        this.userTrackingService.createScript1(data.user.id, data.user.acquisition, data.user.acquisition_campaign, data.user.country);
        if (encoded_redirect_url != undefined){
          
          let path = decodeURIComponent(encoded_redirect_url);
          delete params.user_session;
          delete params.redirect_url;
          this.router.navigate([path], {queryParams: params});
          
        }else{
          delete params.user_session;
          delete params.redirect_url;
          this.router.navigate(['/dashboard'], {queryParams: params});
        }
      },
      (err)=>{
        this.formIsWaitingForResponse = false;
        this.formIsWaitingForResponse = false;
        if (err.status == 400 || err.status == 404){
          this.errors.push(err.error.string);
        }else if(err.status == 422){
          err.error.errors.forEach(error => {
            this.errors.push(error.field+': '+ error.message);
          });
        }
      }
    );
  }


  _showPwd = false;
  _pwdType = 'password';
  _togglePwdType(){
    this._showPwd = !this._showPwd;
    this._pwdType = !this._showPwd ? 'password' : 'text';
    
  }
  
  triedSubmit = false;
  loginFormSubmit(){
    this.triedSubmit = true;
    if (this.form.valid){
      this.errors = [];
      this.formIsWaitingForResponse = true;
      this.authServiceRef.requestLogIn( this.form.value.email,this.form.value.password).subscribe(
        (JsonData)=>{
          this.authServiceRef.storeSessionData(JsonData, this.form.value.rememberme );
          this.formIsWaitingForResponse = false;
          this.authServiceRef.user = JsonData.user;
          
          this.userTrackingService.createScript1(JsonData.user.id, JsonData.user.acquisition, JsonData.user.acquisition_campaign, JsonData.user.country);
          // this.plansServiceRef.initPlans(this.route.snapshot.queryParams.selected_offer);
          if (this.route.snapshot.queryParams['redirect_url'] != undefined){
            let path = decodeURIComponent(this.route.snapshot.queryParams['redirect_url']);
            let params = decodeURIComponent(this.route.snapshot.queryParams['qParams']);
            this.router.navigate([path], {queryParams: this.router.parseUrl('?' + params).queryParams});
          }else{
            this.router.navigate(['/dashboard']);
          }
        }, 
        (err)=>{
          // console.log(err);
          this.formIsWaitingForResponse = false;
          if (err.status == 400){
            this.errors.push(err.error.string);
          }else if(err.status == 422){
            err.error.errors.forEach(error => {
              this.errors.push(error.field+': '+ error.message);
            });
          }
        }
      );
    }
    
  }

  loginWith(type: string){
    this.formIsWaitingForResponse = true;
    let successfulPath = window.location.origin+"/login?user_session=_TOKEN_";
    if (this.route.snapshot.queryParams['redirect_url'] != undefined){
      successfulPath += '&redirect_url='+ this.route.snapshot.queryParams['redirect_url'];
    }
    if (this.route.snapshot.queryParams['qParams'] != undefined){
      successfulPath += '&qParams='+this.route.snapshot.queryParams['qParams'];
    }

    this.authServiceRef.registerUserWithRemote(
      {
        type: type,
        referralKey: this.inviteService.getLocalReferralId(),
        pageKey: null,
        voucher: null,
        voucherPlanId: null,
        voucherPackageIds: null
      }, 
      successfulPath, 
      window.location.origin+"/login"
    ).subscribe(
        (data:any)=>{
          if (this.inviteService.getLocalReferralId() != null){
            this.inviteService.removeLocalReferralId();
          }
          window.location.href = data.url;
        },
        (error)=>{
          console.log(error);
        }
    );


  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null],
      password: [null],
      rememberme: [null]
    });
  }

}
