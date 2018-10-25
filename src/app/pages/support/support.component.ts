import { Component, OnInit } from '@angular/core';
import { StaticContentService } from '../../services/static-content/static-content.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_LIST } from '../../services/web-api/api-list';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
  animations: [
    trigger('fade', [
      state('in', style({opacity: '1', transform: 'scale(1)'})),
      state('out', style({opacity: '0', transform: 'scale(0.985)'})),
      transition('in <=> out', animate('200ms ease-in'))
    ])
  ]
})
export class SupportComponent implements OnInit {

  constructor(private httpClient: HttpClient){}

  faqData = {
    paymentIssues: {
      title: 'Issues with payment',
      icon: '/assets/images/support/card.png',
      visible: false,
      items: [
        {
          question: `My bank or credit card has charged me an extra fee.`,
          answer: `<p>On very rare occasions some bank cards charge an additional fee, due to their internal policy on lottery tickets. This unfortunately is outside of our control and is a decision that is made by your card issuer. We recommend using a debit card or changing to accredit card which does charge for this. Contacting your card issuer will help you determine what their charges are.</p>`
        },
        {
          question: `It says my transaction has failed.`,
          answer: `
            <p>The mains reasons for decline of payment are as follows:</p>
            <ul>
              <li>Your name or address has an apostrophe such O’Conner. <br />At the moment we cannot accept irregular characters in our payment system. Remove the offending character and our system will accept your payment.</li>
              <li>You have insufficient funds in your account. <br />Please check the funds in your bank account and ensure that you have enough to cover the payment. Alternatively, try a different card.</li>
              <li>It shows Invalid Card or Payment Declined. <br />This happens from time to time, when your bank does not authorise the payment. We recommend that you either contact your bank or try a different card.</li>
            </ul>
          `
        },
        {
          question: `My payment card is out of date and needs to be changed.`,
          answer: `<p>You can update your credit card details directly through <a href="/update-payment-card">Update my payment card</a>. When you change your card it will take payment for the next renewal in advance, so you will temporarily be paid up for your syndicate places one round in advance. But then the billing will carry on as usual.</p>`
        },
        {
          question: `I have been billed incorrectly or unexpectedly.`,
          answer: `<p>Please contact us and we will help you to resolve this quickly and amicably.</p>`
        }
      ]
    },
    collectWinings: {
      title: 'How to collect your winnings',
      icon: '/assets/images/support/piggy.png',
      visible: false,
      items: [
        {
          question: `When my lottery lines win, what do I have to do to collect my winnings?`,
          answer: `<p>You don’t have to do anything, as the service is fully automated. Your winnings are collected automatically and held in your balance.</p>`
        },
        {
          question: `Where can I find my winnings?`,
          answer: `<p>You will find your balance on the <a href="/my-balance">My Balance page</a>. This represents your winnings minus any withdrawals you’ve made.</p>`
        },
        {
          question: `How do I cash in my winnings?`,
          answer: `<p>Simply visit <a href="/my-balance">My Balance page</a> and click Collect My Winnings.</p>`
        },
        {
          question: `Will you contact me if I win big?`,
          answer: `<p>Yes. If you balance rises above £100 we will contact you by email and phone. Otherwise your winnings are collected automatically and held in your balance.</p>`
        },
        {
          question: `Is there a time limit to cash in my winnings?`,
          answer: `
          <p>There is no time limit as long as you maintain an active subscription.</p>
          <p>If you close your account or are no longer subscribed and your balance is less than £100, we will maintain your balance for a minimum of 1 year, after your subscription has ended.</p>
          <p>If you close your account or are no longer subscribed and your balance is greater than £100, we will maintain your balance for a minimum of 3 years, after your subscription has ended.</p>
          `
        },
        {
          question: `Do you take an admin charge or commission from winnings?`,
          answer: `<p>There are NO admin charges or service s charges. The FULL winnings are cut into 88 portions and shared by each syndicate member.</p>`
        },
        {
          question: `Are there any restrictions on what I can cash in?`,
          answer: `<p>You can cash in the full amount of your balance to an unlimited level. You need a minimum balance of £3 in order to make a withdrawal.  We have kept this requirement as low as we can, but it is necessary as we may incur transaction charges for every transaction we undertake.</p>`
        },
        {
          question: `How does it work with America Lotteries such as PowerBall and Mega Millions?`,
          answer: `
            <p>
              We use a service called Lottery Tech who buy on our behalf directly from the official Mega Millions and PowerBall lottery companies.
              Our winnings are also collected directly from the lottery companies.
            </p>
            <p>
              We always collect the cash prize, rather than the annuity, which means the pay out will not be the advertised jackpot.
              We pay Federal and state Taxes as explained on the Mega Millions website <a href="http://www.megamillions.com/faqs" target="_blank">here</a>.
              And then the money goes directly into the syndicate.
            </p>
          `
        }
      ]
    },
    dataPrivacy: {
      title: 'Data privacy',
      icon: '/assets/images/support/privacy.png',
      visible: false,
      items: [
        {
          question: `At Wshful we are committed to protecting your privacy.`,
          answer: `
            <p>Our <a href="/privacy-policy">Privacy Policy</a> reflects recent data protection law including GDPR.</p>
            <p>In addition to updating our Privacy Policy, we have made it easier for you to be in control of the data we use for marketing. You can update your <a href="/email-preferences">Email &amp; SMS preferences</a> settings at any time including removing yourself from receiving future communications.</p>
          `
        },
        {
          question: `I'm receiving unsolicited emails or SMS from you / or I have tried to unsubscribe without success.`,
          answer: `
            <p>
              When a customer registers with us, we will look to send them marketing emails or SMS to convince them to fully subscribe and to make
              them aware of any special promotions including price promotions.You may unsubscribe from these communications at any time.
            </p>
            <p>
                On occasion you may receive marketing emails from us, which come from a third party.  We use external marketing agencies for our
                email and SMS marketing activity. All of our agencies follow strict data protection rules and will only email you if you have given permission for them to do so.
            </p>
            <p>
                <b><u>If you believe that you have received an email which you had not opted into, please forward the email to us.</u></b>
            </p>
            <p>
                We will then use the email to investigate who sent you the email and whether they have your permission to do so.
                In the event that they have not got correct permissions, we will ensure they remove you from their databases and
                will fully investigate their processes for managing their customer data and if necessary remove them from our suppliers list.
            </p>
          `
        }
      ]
    },
    cancelInstantly: {
      title: 'How to cancel instantly',
      icon: '/assets/images/support/cancel.png',
      visible: false,
      items: [
        {
          question: `How can I cancel?`,
          answer: `
            <p>You can cancel <a href="/subscription-plan">here</a>.</p>
            <p>Or you can email us at: <a href="mailto:support@wshful.com">support@wshful.com</a>. Or you can <a href="tel:+4402071833109">call us +44&nbsp;(0)&nbsp;2071833109</a>.</p>
            <p>As soon as you cancel we immediately switch off your renewal – so you will not be billed again. You will remain a member until it is time to renew (4 weeks) and you are still eligible for your share of any winning tickets until your subscription ends.</p>
          `
        },
        {
          question: `How does cancellation work?`,
          answer: `
            <p>Our service is run on a four week cycle with recurring billing to ensure that the service is uninterrupted and that we never miss a draw for our members.</p>
            <p>Members can cancel at any time and this takes effect at the end of each 4 week cycle, when we can restructure our syndicates removing old members and adding  new members as required.</p>
          `
        },
        {
          question: `Why can’t I cancel midway through my 4 weeks subscription cycle?`,
          answer: `
            <p>We simply could not run the service, as it would be impossible to keep track of contributions and winnings if anyone could come and go at any point in the four week cycle.</p>
          `
        },
        {
          question: `If I end my subscription do I lose the bonus syndicate places I have?`,
          answer: `<p>No, you don’t lose them. You keep your syndicate places and any winnings for those syndicates will be shared with you.</p>`
        },
        {
          question: `If I end my subscription, do I lose my winnings?`,
          answer: `
            <p>No you can claim your winnings at any time and we commit to keeping them in your balance for at least a year and in certain circumstances 3 years.</p>
            <ul>
              <li>If you close your account or are no longer subscribed and your balance is less than £100, we will maintain your balance for a minimum of 1 year, after your subscription has ended.</li>
              <li>If you close your account or are no longer subscribed and your balance is greater than £100, we will maintain your balance for a minimum of 3 years, after your subscription has ended.</li>
            </ul>
          `
        },
        {
          question: `After being a member, have decided to cancel. If the syndicate wins after my subscription has ended can I still claim something?`,
          answer: `<p>Unfortunately not. You have to be in it, to win it. Once you leave your syndicate – you are no longer entitled to any new winnings the syndicate makes.</p>`
        }
      ]
    }
  };

  detailsData = null;
  animationShowDetails = false;
  animationShowMain = true;
  showDetailsFor(dataObj){

    this.animationShowMain = false;
    setTimeout(()=>{
      this.detailsData = dataObj;
      setTimeout(()=>{
        this.animationShowDetails = true;
        // console.log(document.querySelector('.content-wrap').getBoundingClientRect().top);
        window.scrollTo(0, document.querySelector('.content-wrap').getBoundingClientRect().top + window.pageYOffset);
      },0);
    },200);


  }

  hideDetails(){
    this.animationShowDetails = false;
    setTimeout(()=>{
      this.detailsData = null;
      setTimeout(()=>{
        this.animationShowMain = true;
      },0);
    },200);
  }

  contactFormFields = {
    name: '',
    email: '',
    phone:'',
    text: ''
  }
  formErrors = [];
  sendingMessage = false;
  triedSubmit = false;
  showUpdateSuccessfullMsg = false;
  sendMessage(f){
    this.triedSubmit = true;
    this.formErrors = [];
    if (f.valid){
      this.sendingMessage = true;
      this.httpClient.post(API_LIST.contactMessage(), this.contactFormFields).subscribe(
        (data)=>{
          this.sendingMessage = false;
          this.showUpdateSuccessfullMsg = true;
          setTimeout(()=> {
            this.showUpdateSuccessfullMsg = false;
          }, 5000);
        },
        (err:HttpErrorResponse)=>{

          if(err.status == 422){
            err.error.errors.forEach(error => {
              this.formErrors.push(error.field+': '+error.message);
            });
          }else{
            this.formErrors.push(err.error.string);
          }
          this.sendingMessage = false;
        }
      );
    }

  }



  ngOnInit() {
  }

}
