import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ActivateIfLoggedIn, ActivateIfNotLoggedIn } from './services/auth-guard/auth-guard.service';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { HomeComponent } from './pages/home/home.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { SupportComponent } from './pages/support/support.component';
import { LotteryResultsComponent } from './pages/lottery-results/lottery-results.component';
import { SyndicatesComponent } from './pages/syndicates/syndicates.component';
import { ReferFriendComponent } from './pages/refer-friend/refer-friend.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { MyReferralsComponent } from './pages/my-referrals/my-referrals.component';
import { BannersComponent } from './pages/banners/banners.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { PaymentStatusComponent } from './pages/payment-status/payment-status.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyTicketsComponent } from './pages/my-tickets/my-tickets.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { MySyndicatesComponent } from './pages/my-syndicates/my-syndicates.component';
import { MyResultsComponent } from './pages/my-results/my-results.component';
import { MyBalanceComponent } from './pages/my-balance/my-balance.component';
import { MyBonusesComponent } from './pages/my-bonuses/my-bonuses.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ChangeMyPasswordComponent } from './pages/change-my-password/change-my-password.component';
import { MySubscriptionPlanComponent } from './pages/my-subscription-plan/my-subscription-plan.component';
import { PaymentHistoryComponent } from './pages/payment-history/payment-history.component';
import { EmailPreferencesComponent } from './pages/email-preferences/email-preferences.component';
import { UpdatePaymentCardComponent } from './pages/update-payment-card/update-payment-card.component';
import { SubscriptionAgreementComponent } from './pages/subscription-agreement/subscription-agreement.component';
import { InviteReferralComponent } from './pages/invite-referral/invite-referral.component';
import { SmsComponent } from './pages/sms/sms.component';
import { SmsReComponent } from './pages/sms-re/sms-re.component';


export const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: { pageTitle: 'Home', pageClass: 'page-home', showInNav: false, hideFromNavIfNotLoggedIn: false }
    },
    {
        path: 'how-it-works',
        component: HowItWorksComponent,
        data: { pageTitle: 'How It Works', pageClass: 'page-how-it-works', showInNav: true, hideFromNavIfNotLoggedIn: false }
    },
    {
        path: 'pricing',
        component: PricingComponent,
        data: { pageTitle: 'Pricing', pageClass: 'page-pricing', showInNav: true, hideFromNavIfNotLoggedIn: false }
    },
    {
        path: 'about-us',
        component: AboutUsComponent,
        data: { pageTitle: 'About Us', pageClass: 'page-about-us', showInNav: true, hideFromNavIfNotLoggedIn: false }
    },
    {
        path: 'syndicates',
        component: SyndicatesComponent,
        data: { pageTitle: 'Syndicates', pageClass: 'page-syndicates', showInNav: false, hideFromNavIfNotLoggedIn: false }
    },
    {
        path: 'lottery-results',
        component: LotteryResultsComponent,
        data: { pageTitle: 'Lottery Results', pageClass: 'page-lottery-results', showInNav: true, hideFromNavIfNotLoggedIn: false }
    },
    {
        path: 'refer-a-friend',
        component: ReferFriendComponent,
        data: { pageTitle: 'Refer a Friend', pageClass: 'page-refer-a-friend', showInNav: true, hideFromNavIfNotLoggedIn: true },
        canActivate: [ActivateIfLoggedIn],
    },
    {
        path: 'support',
        component: SupportComponent,
        data: { pageTitle: 'Support', pageClass: 'page-support', showInNav: true, hideFromNavIfNotLoggedIn: false }
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { pageTitle: 'Login', pageClass: 'page-login', showInNav: false, hideFromNavIfNotLoggedIn: false },
        canActivate: [ActivateIfNotLoggedIn]
    },
    {
        path: 'password-recovery',
        component: PasswordRecoveryComponent,
        data: { pageTitle: 'Account Recovery', pageClass: 'page-password-recovery', showInNav: false, hideFromNavIfNotLoggedIn: false }
    },
    {
        path: 'password-recovery/:key',
        component: PasswordRecoveryComponent,
        data: { pageTitle: 'Account Recovery', pageClass: 'page-password-recovery', showInNav: false, hideFromNavIfNotLoggedIn: false }
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: { pageTitle: 'Register', pageClass: 'page-register', showInNav: false, hideFromNavIfNotLoggedIn: false }
        // redirectTo: '/pricing', pathMatch: 'full',
    },
    {
        path: 'register/:plan_name',
        component: RegisterComponent,
        data: { pageTitle: 'Register', pageClass: 'page-register', showInNav: false, hideFromNavIfNotLoggedIn: false }
        // canActivate:[ActivateIfNotLoggedIn]
    },
    {
        path: 'subscription',
        redirectTo: '/pricing', pathMatch: 'full',
    },
    {
        path: 'subscription/:plan_name',
        component: SubscriptionComponent,
        data: { pageTitle: 'Subscription', pageClass: 'page-subscription', showInNav: false, hideFromNavIfNotLoggedIn: false },
        canActivate: [ActivateIfLoggedIn]
    },
    {
        path: 'invite/:ref_id',
        component: InviteReferralComponent,
        data: { pageTitle: 'Invite', pageClass: 'page-invite', showInNav: false, hideFromNavIfNotLoggedIn: false }
    },
    {
        path: 'payment-status/:tid',
        component: PaymentStatusComponent,
        data: { pageTitle: 'Payment Status', pageClass: 'page-payment-status', showInNav: false, hideFromNavIfNotLoggedIn: false },
        canActivate: [ActivateIfLoggedIn]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          pageTitle: 'Dashboard',
          pageClass: 'page-dashboard section-page-dashboard',
          showInNav: false,
          hideFromNavIfNotLoggedIn: false
        },
        canActivate: [ActivateIfLoggedIn]
    },
    {
        path: 'my-tickets',
        component: MyTicketsComponent,
        data: {
          pageTitle: 'My Tickets',
          pageClass: 'page-my-tickets section-page-dashboard',
          showInNav: false,
          hideFromNavIfNotLoggedIn: false
        },
        canActivate: [ActivateIfLoggedIn]
    },
    {
        path: 'my-syndicates',
        component: MySyndicatesComponent,
        data: {
          pageTitle: 'My Syndicates',
          pageClass: 'page-my-syndicates section-page-dashboard',
          showInNav: false,
          hideFromNavIfNotLoggedIn: false
        },
        canActivate: [ActivateIfLoggedIn]
    },
    {
        path: 'my-results',
        component: MyResultsComponent,
        data: {
          pageTitle: 'My Results',
          pageClass: 'page-my-results section-page-dashboard',
          showInNav: false,
          hideFromNavIfNotLoggedIn: false
        },
        canActivate: [ActivateIfLoggedIn]
    },
    {
        path: 'my-balance',
        component: MyBalanceComponent,
        data: {
          pageTitle: 'My Balance',
          pageClass: 'page-my-balance section-page-dashboard',
          showInNav: false,
          hideFromNavIfNotLoggedIn: false
        },
        canActivate: [ActivateIfLoggedIn]
    },
    {
        path: 'my-balance/:withdraw',
        component: MyBalanceComponent,
        data: {
          pageTitle: 'My Balance',
          pageClass: 'page-my-balance section-page-dashboard',
          showInNav: false,
          hideFromNavIfNotLoggedIn: false
        },
        canActivate: [ActivateIfLoggedIn]
    },

    {
        path: 'my-referrals',
        component: MyReferralsComponent,
        data: {
          pageTitle: 'My Referrals',
          pageClass: 'page-my-referrals section-page-dashboard',
          showInNav: false,
          hideFromNavIfNotLoggedIn: true
        },
        canActivate: [ActivateIfLoggedIn],
    },
    {
        path: 'my-bonuses',
        component: MyBonusesComponent,
        data: {
          pageTitle: 'My Bonuses',
          pageClass: 'page-my-bonuses section-page-dashboard',
          showInNav: false,
          hideFromNavIfNotLoggedIn: true
        },
        canActivate: [ActivateIfLoggedIn],
    },
    {
        path: 'account',
        redirectTo: '/my-profile', pathMatch: 'full',
    },
    {
        path: 'my-profile',
        component: MyProfileComponent,
        data: {
          pageTitle: 'My Profile',
          pageClass: 'page-my-profile section-page-dashboard',
          showInNav: false,
          hideFromNavIfNotLoggedIn: true
        },
        canActivate: [ActivateIfLoggedIn],
    },
    {
        path: 'change-password',
        component: ChangeMyPasswordComponent,
        data: {
          pageTitle: 'Change Password',
          pageClass: 'page-change-password section-page-dashboard',
          showInNav: false,
          hideFromNavIfNotLoggedIn: true
        },
        canActivate: [ActivateIfLoggedIn],
    },
    {
        path: 'subscription-plan',
        component: MySubscriptionPlanComponent,
        data: {
          pageTitle: 'Subscription Plan',
          pageClass: 'page-subscription-plan section-page-dashboard',
          showInNav: false,
          hideFromNavIfNotLoggedIn: true
        },
        canActivate: [ActivateIfLoggedIn],
    },
    {
        path: 'payment-history',
        component: PaymentHistoryComponent,
        data: {
          pageTitle: 'Payment History',
          pageClass: 'page-payment-history section-page-dashboard',
          showInNav: false,
          hideFromNavIfNotLoggedIn: true
        },
        canActivate: [ActivateIfLoggedIn],
    },
    {
        path: 'email-preferences',
        component: EmailPreferencesComponent,
        data: {
          pageTitle: 'Email & SMS Preferences',
          pageClass: 'page-email-preferences section-page-dashboard',
          showInNav: false,
          hideFromNavIfNotLoggedIn: true
        },
        canActivate: [ActivateIfLoggedIn],
    },
    {
        path: 'update-payment-card',
        component: UpdatePaymentCardComponent,
        data: {
          pageTitle: 'Update Payment Card',
          pageClass: 'page-update-payment-card section-page-dashboard',
          showInNav: false,
          hideFromNavIfNotLoggedIn: true
        },
        canActivate: [ActivateIfLoggedIn],
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        data: { pageTitle: 'Privacy Policy', pageClass: 'page-privacy-policy', showInNav: false, hideFromNavIfNotLoggedIn: false },
    },
    {
        path: 'subscription-agreement',
        component: SubscriptionAgreementComponent,
        data: {
          pageTitle: 'Subscription Agreement',
          pageClass: 'page-subscription-agreement',
          showInNav: false,
          hideFromNavIfNotLoggedIn: false
        },
    },
    {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent,
        data: {
          pageTitle: 'Terms & Conditions',
          pageClass: 'page-terms-and-conditions',
          showInNav: false,
          hideFromNavIfNotLoggedIn: false
        },
    },
    {
      path: 'sms',
      component: SmsComponent,
      data: {
        pageTitle: 'Welcome',
        pageClass: 'page-subscription-plan',
        showInNav: false,
        hideFromNavIfNotLoggedIn: false
      }
    },
    {
      path: 'sms/re',
      component: SmsReComponent,
      data: {
        pageTitle: 'Welcome',
        pageClass: 'page-subscription-plan',
        showInNav: false,
        hideFromNavIfNotLoggedIn: false
      }
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        data: { pageTitle: 'Page Not Found', pageClass: 'page-not-found', showInNav: false, hideFromNavIfNotLoggedIn: false }
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        ActivateIfLoggedIn,
        ActivateIfNotLoggedIn
    ],
    bootstrap: []
})
export class AppRoutesModule { }
