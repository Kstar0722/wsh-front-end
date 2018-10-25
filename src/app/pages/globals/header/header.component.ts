import { Component, OnInit, HostListener, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageTplDataService, PageTplDataModel } from '../../../services/page-tpl-data/page-tpl-data.service';
import { CurrencyService } from '../../../services/currency/currency.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent {

  @ViewChild('topheaderelem') topHeaderElem;
  @ViewChild('topheaderplaceholderelem') topheaderplaceholderelem;

  @Input('textAbovePageTitle') textAbovePageTitle;
  @Input('replacePageTitle') replacePageTitle;

  private lastScrollPos = 0;

  public pageTplData: PageTplDataModel;
  private pageTplDataServiceRef: PageTplDataService;
  public currencyServiceRef: CurrencyService;


  constructor(
    private activatedRoute: ActivatedRoute,
    pageTplDataService: PageTplDataService,
    currencyService: CurrencyService
  ) {
    this.currencyServiceRef = currencyService;
    this.pageTplDataServiceRef = pageTplDataService;
    this.pageTplData = this.pageTplDataServiceRef.pageTplData;
  }
  menuToggle() {
    this.pageTplDataServiceRef.menuToggle();
  }
  menuHide() {
    this.pageTplDataServiceRef.menuHide();
  }
  menuShow() {
    this.pageTplDataServiceRef.menuShow();
  }

  headerFixed(topheaderplaceholderelem, topHeaderElem) {
    if (topheaderplaceholderelem !== undefined && topHeaderElem !== undefined) {
      this.pageTplData.headerHeight = topHeaderElem.nativeElement.offsetHeight;
      topheaderplaceholderelem.nativeElement.style.paddingTop = this.pageTplData.headerHeight + 'px';
      topHeaderElem.nativeElement.style.position = 'fixed';
      this.pageTplData.fixedHeader = true;
    }
  }

  headerStatic(topheaderplaceholderelem, topHeaderElem) {
    if (topheaderplaceholderelem !== undefined && topHeaderElem !== undefined) {
      topHeaderElem.nativeElement.style.position = 'relative';
      topHeaderElem.nativeElement.style.top = '0px';
      topheaderplaceholderelem.nativeElement.style.paddingTop = '0px';
      this.pageTplData.fixedHeader = false;
    }
  }

  headerFixedShow(topHeaderElem) {
    if (topHeaderElem !== undefined) {
      topHeaderElem.nativeElement.style.top = '0px';
    }
  }
  headerFixedHide(topHeaderElem) {
    if (topHeaderElem !== undefined) {
      topHeaderElem.nativeElement.style.top = -this.pageTplData.headerHeight + 'px';
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > this.topHeaderElem.nativeElement.offsetHeight) {
      if (!this.pageTplDataServiceRef.pageTplData.fixedHeader) {
        this.headerFixed(this.topheaderplaceholderelem, this.topHeaderElem);
      } else {
        if (window.pageYOffset > this.lastScrollPos) {
          this.headerFixedHide(this.topHeaderElem);
        } else if (window.pageYOffset < this.lastScrollPos) {
          this.headerFixedShow(this.topHeaderElem);
        }
      }
    } else {
      if (this.pageTplDataServiceRef.pageTplData.fixedHeader) {
        this.headerStatic(this.topheaderplaceholderelem, this.topHeaderElem);
      }
    }
    this.lastScrollPos = window.pageYOffset;
  }

}
