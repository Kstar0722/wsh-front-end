import { Injectable } from '@angular/core';
import { CurrencyService, Currency } from '../currency/currency.service';
import { API_LIST } from '../web-api/api-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class PlansService {

  trialPlanTemplate = 'discount-trial';
  plansTemplate = null;
  plans: Plans = new Plans();
  currencyServiceRef: CurrencyService;
  plansLoading = false;

  packagePriceIds = {
    bronze: 1,
    silver: 2,
    gold: 3
  };
  getNameOfPackageId(id: number) {
    let name = <string>null;
    Object.keys(this.packagePriceIds).forEach((key, i) => {
      if (id === this.packagePriceIds[key]) {
        name = key;
      }
    });
    return name;
  }

  constructor(currencyService: CurrencyService, private httpClient: HttpClient, route: ActivatedRoute) {
    this.currencyServiceRef = currencyService;
  }
  isTrial() {
    if (this.plansTemplate === this.trialPlanTemplate) {
      return true;
    } else {
      return false;
    }
  }
  isValidPlanName(name: string) {
    if (Object.keys(this.packagePriceIds).indexOf(name) > -1 ) {
      return true;
    }
  }
  public requestPlans(typeSlug): Observable<any> {
    return this.httpClient.get<any>(API_LIST.plansPricing(typeSlug, this.currencyServiceRef.getSelectedCurrency()));
  }

  private completePlanModels(data) {
    // console.log(data);
    Object.keys(this.packagePriceIds).forEach(planName => {
      this.plans[planName].planVars.packagePriceId = data.package_prices[this.packagePriceIds[planName] - 1].package_price.id;
      this.plans[planName].planVars.weeks = data.package_prices[this.packagePriceIds[planName] - 1].package_price.package.weeks;
      this.plans[planName].planVars.originalPrice = data.package_prices[this.packagePriceIds[planName] - 1].original_price.raw;
      this.plans[planName].planVars.price = data.package_prices[this.packagePriceIds[planName] - 1].price.raw;
      this.plans[planName].planVars.reductionPercentage = data.package_prices[this.packagePriceIds[planName] - 1].reduction_percentage;
      this.plans[planName].planVars.reduction = data.package_prices[this.packagePriceIds[planName] - 1].reduction.raw;
      this.plans[planName].planVars.currencySymbol = this.currencyServiceRef.getCurrencySymbolForName(
        data.package_prices[this.packagePriceIds[planName] - 1].price.currency );
      this.plans[planName].planVars.costPerWeekRaw = data.package_prices[this.packagePriceIds[planName] - 1].price_per_week.raw;
      this.plans[planName].planVars.costPerWeek = data.package_prices[this.packagePriceIds[planName] - 1].price_per_week.simple;
      this.plans[planName].planVars.originalCostPerWeek =
        data.package_prices[this.packagePriceIds[planName] - 1].original_price_per_week.simple;
      this.plans[planName].planVars.originalCostPerWeekRaw =
        data.package_prices[this.packagePriceIds[planName] - 1].original_price_per_week.raw;
      this.plans[planName].planVars.costPerLine = data.package_prices[this.packagePriceIds[planName] - 1].price_per_line.as_parts;
      this.plans[planName].planVars.syndicates =
        data.package_prices[this.packagePriceIds[planName] - 1].package_price.package.syndicates_number;
      this.plans[planName].planVars.lotteryLines.powerball = 0;

      for (let bonusKey in data.awaiting_bonuses) {
        if (!data.awaiting_bonuses.hasOwnProperty(bonusKey)) {
          continue;
        }

        let awaitingBonus:any = data.awaiting_bonuses[bonusKey];

        if (awaitingBonus.lottery_code === 'powerball') {
          this.plans[planName].planVars.lotteryLines.powerball = awaitingBonus.bonus_lines;
        }
      }

      this.plans[planName].planVars.lotteriesData = data.lotteries_data;
    });
    // console.log(this.plans);
  }
  public initPlans(typeSlug?) {
    const slug = typeSlug === undefined || typeSlug === '' || typeSlug == null ? 'default' : typeSlug;
    this.plans.bronze = new Plan({
      packagePriceId: null,
      weeks: null,
      originalPrice: null,
      price: null,
      reductionPercentage: null,
      reduction: null,
      currencySymbol: '',
      chances: 20 * 4,
      improvedOdds: 20,
      syndicates: null,
      costPerWeekRaw: null,
      originalCostPerWeek: null,
      originalCostPerWeekRaw: null,
      costPerWeek: null,
      costPerLine: null,
      weeklyDraws: 2,
      lotteryLines: {
        euromillions: 5,
        megamillions: 5,
        powerball: 0
      },
      showMoreOnMobile: false,
      lotteriesData: []
    });
    this.plans.silver = new Plan({
      packagePriceId: null,
      weeks: null,
      originalPrice: null,
      price: null,
      reductionPercentage: null,
      reduction: null,
      currencySymbol: '',
      chances: 60 * 4,
      improvedOdds: 60,
      syndicates: null,
      costPerWeekRaw: null,
      originalCostPerWeek: null,
      originalCostPerWeekRaw: null,
      costPerWeek: null,
      costPerLine: null,
      weeklyDraws: 2,
      lotteryLines: {
        euromillions: 15,
        megamillions: 15,
        powerball: 0
      },
      showMoreOnMobile: false,
      lotteriesData: []
    });
    this.plans.gold = new Plan({
      packagePriceId: null,
      weeks: null,
      originalPrice: null,
      price: null,
      reductionPercentage: null,
      reduction: null,
      currencySymbol: '',
      chances: 120 * 4,
      improvedOdds: 120,
      syndicates: null,
      costPerWeekRaw: null,
      originalCostPerWeek: null,
      originalCostPerWeekRaw: null,
      costPerWeek: null,
      costPerLine: null,
      weeklyDraws: 2,
      lotteryLines: {

        euromillions: 30,
        megamillions: 30,
        powerball: 0
      },
      showMoreOnMobile: false,
      lotteriesData: []
    });
    this.plansLoading = true;
    this.requestPlans(slug).subscribe((data) => {
      this.completePlanModels(data);
      this.plansTemplate = data.packages_set.template;
      this.plansLoading = false;
    });
  }
}

export class Plan {
  public planVars: PlanVars;
  constructor(planVars: PlanVars) {
    this.planVars = planVars;
  }
}
export class Plans {
  bronze: Plan;
  silver: Plan;
  gold: Plan;
}
export class PlanVars {
  packagePriceId: number;
  weeks: number;
  originalPrice: number;
  price: number;
  reductionPercentage: number;
  reduction: number;
  currencySymbol: string;
  costPerWeekRaw: number;
  originalCostPerWeek: number;
  originalCostPerWeekRaw: number;
  costPerWeek: number;
  costPerLine: number;
  chances: number;
  improvedOdds: number;
  weeklyDraws: number;
  syndicates: number;
  lotteryLines: {euromillions: number, megamillions: number, powerball: number};
  showMoreOnMobile: boolean;
  lotteriesData: PlanLotteryData[];
}
export class DrawTimeData {
  weekday: string;
  time: string;
  cutoff_time: string;
  timezone: string;
}
export class PlanLotteryData {
  lottery_name: string;
  lottery_key: string;
  draws_per_week: number;
  lines_per_draw: number;
  lines_per_week: number;
  draw_times: DrawTimeData[];
}
export class MembershipData {
  membership: SimpleMembership;
  lotteries_data: PlanLotteryData[];
}
export class Syndicate {
  id: number;
  name: string;
  type: string;
}
export class SimpleMembership {
  syndicate: Syndicate;
  start_datetime: string;
  last_renew_datetime: string;
  finish_datetime: string;
}
export class SubscriptionsSummary {
  lottery_lines_amount: number;
  cost_per_line: string;
  lottery_lines_list: PlanLotteryData[];
  subscribed_syndicate_memberships: MembershipData[];
  bonus_syndicate_memberships: MembershipData[];
}