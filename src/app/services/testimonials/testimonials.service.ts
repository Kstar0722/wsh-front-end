import { Injectable } from '@angular/core';

@Injectable()
export class TestimonialsService {
  public data: Testimonial[] = [
    {
      name: 'Ben M.',
      type: 'Syndicate Member',
      photo: '/assets/images/testimonials-ben.jpg',
      stars: 5,
      // tslint:disable-next-line:max-line-length
      comment: 'Been using WSHFUL for a couple of months and whilst I\'ve yet to win anything significant, the strategy is awesome. I get 15 chances per draw which increases my chances of winning significantly. Love the way everything is automated so I don\'t have to do anything.'
    },
    {
      name: 'Natascha N.',
      type: 'Syndicate Member',
      photo: '/assets/images/testimonials-nat.jpg',
      stars: 5,
      // tslint:disable-next-line:max-line-length
      comment: 'WSHFUL is a great company which came up with a completely new idea of playing lottery. In my opinion, this is the future of playing lottery and increasing the chances to win the jackpot.'
    }, {
      name: 'Andrew P.',
      type: 'Syndicate Winner',
      photo: '/assets/images/testimonials-and.jpg',
      stars: 5,
      comment: 'Best internet lottery syndicate I have ever tried!'
    },
    {
      name: 'Zabrina B.',
      type: null,
      photo: null,
      stars: null,
      comment: 'What a great idea! It feels like there is a lottery draw almost every night!'
    },
    {
      name: 'Kirsty L.',
      type: null,
      photo: null,
      stars: null,
      comment: 'Love this way of playing different lotteries.'
    }
  ];
  constructor() { }

}

export class Testimonial {
  name: string;
  type: string;
  photo: string;
  stars: number;
  comment: string;
}
