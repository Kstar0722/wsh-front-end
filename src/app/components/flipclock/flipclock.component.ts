import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-flipclock',
  templateUrl: './flipclock.component.html',
  styleUrls: ['./flipclock.component.css']
})
export class FlipclockComponent {

  // tslint:disable-next-line:no-input-rename
  @Input('count') tillUNIX: string;

  private totalS: number;

  public seconds: any = 0;
  public minutes: any = 0;
  public hours: any = 0;
  public days: any = 0;

  private intervalId: any = null;

  private calculate() {

    this.seconds = ('0' + (this.totalS % 60).toFixed(0)).slice(-2);

    this.minutes = ('0' + (Math.floor(this.totalS / 60) % 60).toFixed(0)).slice(-2);

    this.hours = ('0' + (Math.floor(this.totalS / 3600) % 24).toFixed(0)).slice(-2);

    if ((Math.floor(this.totalS / (3600 * 24))).toFixed(0).length === 1) {
      this.days = ('0' + (Math.floor(this.totalS / (3600 * 24))).toFixed(0)).slice(-2);
    } else {
      this.days = Math.floor(this.totalS / (3600 * 24)).toFixed(0);
    }
  }

  play() {

    this.intervalId = setInterval(() => {
      if (this.totalS < 1000) {
        this.totalS = 0;
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      this.calculate();

      if (this.totalS >= 1000) {
        this.totalS -= 1;
      } else {
        this.totalS = 0;
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }, 1000);
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    const currentUNIX = (new Date()).getTime() / 1000;
    // tslint:disable-next-line:radix
    this.totalS = parseInt(this.tillUNIX) - currentUNIX;
    this.calculate(); // avoid showing 00 before first interval cycle
    if (this.intervalId == null) {
      this.play();
    }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
