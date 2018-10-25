import { Injectable } from '@angular/core';

@Injectable()
export class LotteryPrizesService {
  private tabData = [
    {
      tabTitle: 'EuroMillions',
      tabImage: '/assets/images/logo-euromillions-color.png',
      details: {
        // tslint:disable-next-line:max-line-length
        description: '<p>EuroMillions offers 13 different prize tiers, and the estimated jackpot is published prior to the draw. The exact value of prizes in each tier, including the jackpot*, is calculated according to how many tickets are sold in a particular draw and how many winning tickets there are in any given prize tier.</p><p>Players must pick 5 balls from a pool of 50 main numbers and 2 Lucky Stars from a separate pool of 12 numbers. Please note, calculations and odds in the table below have been rounded to the nearest whole number.</p>',
        table: [
          {
            prizeTier: 'Match 5 + 2 Lucky Stars',
            odds: '1 in 139,838,160',
            averagePrize: '£39,935,092.07'
          },
          {
            prizeTier: 'Match 5 + 1 Lucky Star',
            odds: '1 in 6,991,908',
            averagePrize: '€452,244.80'
          },
          {
            prizeTier: 'Match 5',
            odds: '1 in 3,107,515',
            averagePrize: '£53,480.90'
          },
          {
            prizeTier: 'Match 4 + 2 Lucky Stars',
            odds: '1 in 621,503',
            averagePrize: '£3,140.63'
          },
          {
            prizeTier: 'Match 4 + 1 Lucky Star',
            odds: '1 in 31,075',
            averagePrize: '£142.50'
          },
          {
            prizeTier: 'Match 4',
            odds: '1 in 13,811',
            averagePrize: '£67.57'
          },
          {
            prizeTier: 'Match 3 + 2 Lucky Stars',
            odds: '1 in 14,125',
            averagePrize: '£49.66'
          },
          {
            prizeTier: 'Match 3 + 1 Lucky Star',
            odds: '1 in 706',
            averagePrize: '£10.19'
          },
          {
            prizeTier: 'Match 3',
            odds: '1 in 314',
            averagePrize: '£8.49'
          },
          {
            prizeTier: 'Match 2 + 2 Lucky Stars',
            odds: '1 in 985',
            averagePrize: '£13.87'
          },
          {
            prizeTier: 'Match 2 + 1 Lucky Star',
            odds: '1 in 49',
            averagePrize: '£5.59'
          },
          {
            prizeTier: 'Match 2',
            odds: '1 in 22',
            averagePrize: '£2.85'
          },
          {
            prizeTier: 'Match 1 + 2 Lucky Stars',
            odds: '1 in 188',
            averagePrize: '£7.41'
          }
        ]
      }
    },
    {
      tabTitle: 'Mega Millions',
      tabImage: '/assets/images/logo-megamillions-color.png',
      details: {
        // tslint:disable-next-line:max-line-length
        description: '<p>The odds of winning or sharing a Mega Millions jackpot (2013-2017 version): 1 in about 258.9 million. The overall odds of winning a prize were 1 in 14.71, including the base $1 prize for a "Mega Ball"-only match.</p>',
        table: [
          {
            prizeTier: 'Match 5 + MegaBall',
            odds: '1 in 258,890,850',
            averagePrize: '$115,100,000.00'
          },
          {
            prizeTier: 'Match 5',
            odds: '1 in 17,259,390',
            averagePrize: '$1,000,000.00'
          },
          {
            prizeTier: 'Match 4 + MegaBall',
            odds: '1 in 739,688',
            averagePrize: '$10,000.00'
          },
          {
            prizeTier: 'Match 4',
            odds: '1 in 52,835',
            averagePrize: '$500.00'
          },
          {
            prizeTier: 'Match 3 + MegaBall',
            odds: '1 in 10,720',
            averagePrize: '$200.00'
          },
          {
            prizeTier: 'Match 3',
            odds: '1 in 766',
            averagePrize: '$10.00'
          },
          {
            prizeTier: 'Match 2 + MegaBall',
            odds: '1 in 473',
            averagePrize: '$10.00'
          },
          {
            prizeTier: 'Match 1 + MegaBall',
            odds: '1 in 56',
            averagePrize: '$4.00'
          },
          {
            prizeTier: 'Match 0 + MegaBall',
            odds: '1 in 21',
            averagePrize: '$2.00'
          }
        ]
      }
    },
    {
      tabTitle: 'PowerBall',
      tabImage: '/assets/images/logo-powerball-color.png',
      details: {
        description: '<p></p>',
        table: [
          {
            prizeTier: 'Match 5 + PowerBall',
            odds: '1 in 292,201,338',
            averagePrize: '$149,420,000.00'
          },
          {
            prizeTier: 'Match 5',
            odds: '1 in 11,688,054',
            averagePrize: '$1,000,000.00'
          },
          {
            prizeTier: 'Match 4 + PowerBall',
            odds: '1 in 913,129',
            averagePrize: '$50,000.00'
          },
          {
            prizeTier: 'Match 4',
            odds: '1 in 36,525',
            averagePrize: '$100.00'
          },
          {
            prizeTier: 'Match 3 + PowerBall',
            odds: '1 in 14,494',
            averagePrize: '$100.00'
          },
          {
            prizeTier: 'Match 3',
            odds: '1 in 579',
            averagePrize: '$7.00'
          },
          {
            prizeTier: 'Match 2 + PowerBall',
            odds: '1 in 701',
            averagePrize: '$7.00'
          },
          {
            prizeTier: 'Match 1 + PowerBall',
            odds: '1 in 92',
            averagePrize: '$4.00'
          },
          {
            prizeTier: 'Match 0 + PowerBall',
            odds: '1 in 38',
            averagePrize: '$4.00'
          }
        ]
      }
    }
  ];
  getTabData() {
    return this.tabData;
  }
  constructor() { }

}
