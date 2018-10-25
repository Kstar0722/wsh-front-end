import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HeaderComponent } from './pages/globals/header/header.component';
import { FooterComponent } from './pages/globals/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AppRoutesModule } from './app.routes.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
import { FlipclockComponent } from './components/flipclock/flipclock.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SyndicatesComponent } from './pages/syndicates/syndicates.component';
import { LotteryResultsComponent } from './pages/lottery-results/lottery-results.component';
import { SupportComponent } from './pages/support/support.component';
import { PageTplDataService } from './services/page-tpl-data/page-tpl-data.service';
import { CurrencyService } from './services/currency/currency.service';
import { CurrencySelectorComponent } from './components/currency-selector/currency-selector.component';
import { JackpotBallsComponent } from './components/jackpot-balls/jackpot-balls.component';
import { JackpotSumComponent } from './components/jackpot-sum/jackpot-sum.component';
import { ReferFriendComponent } from './pages/refer-friend/refer-friend.component';


import { JackpotsService } from './services/jackpots/jackpots.service';
import { PricingPlansComponent } from './components/pricing-plans/pricing-plans.component';
import { PricingPlansSimpleComponent } from './components/pricing-plans-simple/pricing-plans-simple.component';
import { CommunityInfographicComponent } from './components/community-infographic/community-infographic.component';
import { SyndicateComparisonComponent } from './components/syndicate-comparison/syndicate-comparison.component';
import { TestimonialsLatestComponent } from './components/testimonials-latest/testimonials-latest.component';
import { TestimonialsCarouselComponent } from './components/testimonials-carousel/testimonials-carousel.component';
import { LotteryResultsTableComponent } from './components/lottery-results-table/lottery-results-table.component';
import { LotteryPrizesComponent } from './components/lottery-prizes/lottery-prizes.component';
import { MyReferralsComponent } from './pages/my-referrals/my-referrals.component';
import { BannersComponent } from './pages/banners/banners.component';
import { PlansService } from './services/plans/plans.service';
import { AuthService } from './services/auth/auth.service';
import { HeaderAccountInfoComponent } from './components/header-account-info/header-account-info.component';
import { RegisterComponent } from './pages/register/register.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { MyReferralsService } from './services/my-referrals/my-referrals.service';
import { CountriesService } from './services/countries/countries.service';
import { UpdateUserFormComponent } from './components/update-user-form/update-user-form.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { StatsService } from './services/stats/stats.service';
import { LotteryResultsService } from './services/lottery-results/lottery-results.service';
import { PaymentStatusComponent } from './pages/payment-status/payment-status.component';
import { LotteryPrizesService } from './services/lottery-prizes/lottery-prizes.service';
import { TestimonialsService } from './services/testimonials/testimonials.service';
import { VoucherValidationComponent } from './components/voucher-validation/voucher-validation.component';
import { CountriesSeparatorPipe } from './custom-pipes/countries-separator/countries-separator.pipe';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyTicketsComponent } from './pages/my-tickets/my-tickets.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { PopUpDirective } from './custom-directives/pop-up/pop-up.directive';
import { MySyndicatesComponent } from './pages/my-syndicates/my-syndicates.component';
import { MyResultsComponent } from './pages/my-results/my-results.component';
import { MyBalanceComponent } from './pages/my-balance/my-balance.component';
import { MyBonusesComponent } from './pages/my-bonuses/my-bonuses.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { CancelSubscriptionComponent } from './components/cancel-subscription/cancel-subscription.component';
import { ChangeMyPasswordComponent } from './pages/change-my-password/change-my-password.component';
import { MySubscriptionPlanComponent } from './pages/my-subscription-plan/my-subscription-plan.component';
import { PaymentHistoryComponent } from './pages/payment-history/payment-history.component';
import { EmailPreferencesComponent } from './pages/email-preferences/email-preferences.component';
import { SyndicateSeparatorPipe } from './custom-pipes/syndicates-separator/syndicate-separator.pipe';
import { DateUnifierPipe } from './custom-pipes/date-unifier/date-unifier.pipe';
import { DateParserService } from './services/date-parser/date-parser.service';
import { UpdatePaymentCardComponent } from './pages/update-payment-card/update-payment-card.component';
import { OffersPopupComponent } from './components/offers-popup/offers-popup.component';
import { SubscriptionAgreementComponent } from './pages/subscription-agreement/subscription-agreement.component';
import { AccordionItemComponent } from './components/accordion-item/accordion-item.component';
import { AccordionGroupComponent } from './components/accordion-group/accordion-group.component';
import { InviteReferralComponent } from './pages/invite-referral/invite-referral.component';
import { RenewalNotifyComponent } from './components/renewal-notify/renewal-notify.component';
import { SmsComponent } from './pages/sms/sms.component';
import { SmsReComponent } from './pages/sms-re/sms-re.component';





@NgModule({
    declarations: [
        AppComponent,

        // Pages
        HeaderComponent,
        FooterComponent,
        PageNotFoundComponent,
        HomeComponent,
        LoginComponent,
        PricingComponent,
        RegisterComponent,
        SubscriptionComponent,
        PaymentStatusComponent,
        HowItWorksComponent,
        AboutUsComponent,
        SyndicatesComponent,
        ReferFriendComponent,
        MyReferralsComponent,
        BannersComponent,
        LotteryResultsComponent,
        SupportComponent,
        PasswordRecoveryComponent,

        // other custom components
        CurrencySelectorComponent,
        JackpotBallsComponent,
        JackpotSumComponent,
        PricingPlansComponent,
        PricingPlansSimpleComponent,
        CommunityInfographicComponent,
        FlipclockComponent,
        NavigationComponent,
        SyndicateComparisonComponent,
        TestimonialsLatestComponent,
        TestimonialsCarouselComponent,
        LotteryResultsTableComponent,
        LotteryPrizesComponent,
        HeaderAccountInfoComponent,
        OrderDetailsComponent,
        UpdateUserFormComponent,
        VoucherValidationComponent,
        CountriesSeparatorPipe,
        UserMenuComponent,
        DashboardComponent,
        MyTicketsComponent,
        PrivacyPolicyComponent,
        TermsAndConditionsComponent,
        PopUpDirective,
        MySyndicatesComponent,
        MyResultsComponent,
        MyBalanceComponent,
        MyBonusesComponent,
        MyProfileComponent,
        CancelSubscriptionComponent,
        ChangeMyPasswordComponent,
        MySubscriptionPlanComponent,
        PaymentHistoryComponent,
        EmailPreferencesComponent,
        SyndicateSeparatorPipe,
        DateUnifierPipe,
        UpdatePaymentCardComponent,
        OffersPopupComponent,
        SubscriptionAgreementComponent,
        AccordionItemComponent,
        AccordionGroupComponent,
        InviteReferralComponent,
        RenewalNotifyComponent,
        SmsComponent,
        SmsReComponent


    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutesModule,
        AngularFontAwesomeModule,
        HttpClientModule,
        SlickCarouselModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        PasswordStrengthBarModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        AuthService,
        PageTplDataService,
        CurrencyService,
        JackpotsService,
        PlansService,
        MyReferralsService,
        CountriesService,
        StatsService,
        LotteryResultsService,
        LotteryPrizesService,
        TestimonialsService,
        DateParserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
