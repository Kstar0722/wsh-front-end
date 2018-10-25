import { Injectable } from '@angular/core';

@Injectable()
export class PageTplDataService {

  public pageTplData: PageTplDataModel = {
    pageClass: null,
    pageTitle: null,
    mobileMenuVisible: false,
    fixedHeader: false,
    headerHeight: 0
  };

  constructor( ) { }

  public setPageTitle(title: string) {
    this.pageTplData.pageTitle = title;
  }
  public setPageClass(pclass: string) {
    this.pageTplData.pageClass = pclass;
  }

  public getPageTitle() {
    return this.pageTplData.pageTitle;
  }
  public getPageClass() {
    return this.pageTplData.pageClass;
  }
  menuToggle() {
    this.pageTplData.mobileMenuVisible = !this.pageTplData.mobileMenuVisible;
  }
  menuHide() {
    this.pageTplData.mobileMenuVisible = false;
  }
  menuShow() {
    this.pageTplData.mobileMenuVisible = true;
  }
}

export class PageTplDataModel {
  pageClass: string;
  pageTitle: string;
  mobileMenuVisible: boolean;
  fixedHeader: boolean;
  headerHeight: number;
}
