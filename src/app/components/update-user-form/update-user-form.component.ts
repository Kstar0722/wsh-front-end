import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Country, CountriesService } from '../../services/countries/countries.service';
import { AuthService, User } from '../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {CountriesSeparatorPipe} from '../../custom-pipes/countries-separator/countries-separator.pipe';
import * as $ from 'jquery';

@Component({
  selector: 'app-update-user-form',
  templateUrl: './update-user-form.component.html',
  styleUrls: ['./update-user-form.component.css']
})
export class UpdateUserFormComponent implements OnInit {

  @Input('submitBtnLabel') submitBtnLabel = 'Save';
  @Input('disabledIf') disabledIf = false;

  @Input('disableFields') disableFields: DisableableFields;
  @Input('showSubmitButton') showSubmitButton = true;
  @Input('defaultPhonePrefix') defaultPhonePrefix = '';

  @Output() done = new EventEmitter();

  @ViewChild('f') form:NgForm;

  authServiceRef: AuthService;
  selectedPlanName: string;

  countriesServiceRef: CountriesService;
  
  

  formErrors: string[] = [];
  formWaitingForResponse: boolean = false;

  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

  // form birth date selectors
  birthDateSelectors = {
    days: <number[]>[],
    months: <{label:string, value:number}[]>[],
    years: <number[]>[]
  };
  countries:Country[] = [];

  formFields = new FormFields();


  constructor(
    authService: AuthService,
    countriesService: CountriesService,
  ) {
    this.countriesServiceRef = countriesService;
    this.authServiceRef = authService;

    // generate birthdate selectors data
    this.generateYears();
    this.generateMonths();
    this.generateDays(this.birthDateSelectors.years[0], this.birthDateSelectors.months[0].value);
    

    countriesService.reqCountries().subscribe((countries)=>{
      this.countries = <Country[]>countries;
      // this.changeCountryPhoneCodeTo(0);

      // preselect United Kingdom
      this.formFields.countryId = '76';
      
      this.formWaitingForResponse = true;
      this.authServiceRef.requestCurrentSessionDataObs.subscribe((user)=>{
        this.populateForm(user, this.formFields);
        this.formWaitingForResponse = false;
      });
      
    });
  }
  scrollToFirstError(){
    $('html, body').animate({scrollTop: $('form .ng-invalid').eq(0).offset().top - 50});
  }
  scrollToErrorMessages(){
    $('html, body').animate({scrollTop: $('form .errors-group').eq(0).offset().top - 50});
  }

  populateForm(source:User, destination:FormFields){
    if ( source.salutation != null ){ 
      destination.salutation = source.salutation;
    }
    if ( source.first_name != null ){ 
      destination.firstName = source.first_name;
    }
    if ( source.last_name != null ){ 
      destination.lastName = source.last_name;
    }
    if ( source.birth ){ 
      destination.birthDay = (new Date(source.birth)).getDate(); 
      destination.birthMonth = (new Date(source.birth)).getMonth()+1;
      destination.birthYear = (new Date(source.birth)).getFullYear();
    }
    if ( source.phone_prefix != null && source.phone_prefix != "+" ){ 
      destination.phonePrefix = source.phone_prefix;
    }else{
      destination.phonePrefix = this.defaultPhonePrefix;
    }
    if ( source.phone1 != null ){ 
      destination.phone = source.phone1;
    }
    if ( source.address1 != null ){ 
      destination.address = source.address1;
    }
    if ( source.city != null ){ 
      destination.town = source.city;
    }
    if ( source.zip_code != null ){ 
      destination.postcode = source.zip_code;
    }
    if ( source.country != null ){ 
      destination.countryId = source.country.id;
    }
  }

  onCountryChange(e){
    // this.changeCountryPhoneCodeTo(this.formFields.countryId);
  }

  changeCountryPhoneCodeTo(i: number){
    this.formFields.phonePrefix = this.countries[this.countriesServiceRef.indexOfCountryId(i, this.countries)].phone_prefix != null ? '+'+this.countries[this.countriesServiceRef.indexOfCountryId(i, this.countries)].phone_prefix : '';
  }

  generateDays(year, month){
    let days = [];
    let daysNo = new Date(year, month, 0).getDate();
    for (let i = 1; i <= daysNo; i++){
      days.push(i);
    }
    this.birthDateSelectors.days = days;
    
  }
  generateMonths(){
    for (let m = 1; m <= 12; m++ ){
      this.birthDateSelectors.months.push({label: this.months[m-1], value: m});
    }
  }
  
  generateYears(){
    let currentYear = (new Date).getFullYear();
    let minYear = currentYear - 130;
    let maxYear = currentYear - 18;
    for ( let y = maxYear; y >= minYear; y-- ){
      this.birthDateSelectors.years.push(y);
    }
  }
  onYearMonthChange(year, month){
    this.generateDays(year, month);
    if (this.birthDateSelectors.days[this.birthDateSelectors.days.length - 1] < this.formFields.birthDay){
      this.formFields.birthDay = this.birthDateSelectors.days[this.birthDateSelectors.days.length - 1];
    }
  }
  monthIdxToReadable(i:number){
    return this.months[i];
  }

  

  triedSubmit = false;
  onSubmit(form){
    this.triedSubmit = true;
    this.formErrors = [];
    if (form.valid){
      if (!this.form.pristine){
        if(this.form.valid){
          this.formWaitingForResponse = true;

          let type = 'regular';
          let fieldsToUpdate = <any>{
            phonePrefix: this.formFields.phonePrefix,
            phone1: this.formFields.phone,
            address1: this.formFields.address,
            city: this.formFields.town,
            country: this.formFields.countryId,
            zipCode: this.formFields.postcode,
            birth: this.formFields.birthYear + '-' +  this.formFields.birthMonth + '-' + this.formFields.birthDay
          };

          if (this.profileNeedsFirstLastName()){
            type = 'social';
            fieldsToUpdate.salutation = this.formFields.salutation;
            fieldsToUpdate.firstName = this.formFields.firstName;
            fieldsToUpdate.lastName = this.formFields.lastName;
          }

          this.authServiceRef.updateCurrentUser(type, fieldsToUpdate).subscribe(
            (user)=>{
              
              this.authServiceRef.user = user;
              this.formWaitingForResponse = false;
              this.done.emit({updated: true});

            },
            (err:HttpErrorResponse)=>{
              console.log(err);
              
              if(err.status == 422){
                err.error.errors.forEach(error => {
                  this.formErrors.push(error.field+': '+error.message);
                });
              }else{
                this.formErrors.push(err.error.string);
              }
              setTimeout(()=>{
                this.scrollToErrorMessages();
              });
              this.formWaitingForResponse = false;
            }
          );


        }else{
          this.formErrors.push('Please fill the required fields.');
          this.scrollToFirstError();
        }
        
      }else{
        this.done.emit({updated: false});
      }
    }
    
    
  }

  profileNeedsFirstLastName(){
    if (
      this.authServiceRef.user.first_name == null || this.authServiceRef.user.first_name == '' ||
      this.authServiceRef.user.last_name == null || this.authServiceRef.user.last_name == ''
    ){
      return true;
    }else{
      return false;
    }
  }

  ngOnInit() {
  }


}
class FormFields {
  salutation = <string>null;
  firstName = <string>null;
  lastName = <string>null;
  birthDay= <number>null;
  birthMonth= <number>null;
  birthYear= <number>null;
  phonePrefix=<string>null;
  phone=<string>null;
  address=<string>null;
  town=<string>null;
  postcode=<string>null;
  countryId=<string>null;
}

export class DisableableFields {
  birthDate?:boolean;
  phonePrefix?:boolean;
  phone?:boolean;
  address?:boolean;
  town?:boolean;
  postcode?:boolean;
  countryId?:boolean;
}
