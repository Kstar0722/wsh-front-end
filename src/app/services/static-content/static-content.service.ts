import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_LIST } from '../web-api/api-list';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaticContentService {

  staticContentData = {
    footerLeftInfo: {
      slug: 'footer-left-info',
      response: <any>null,
      isRequesting: false
    },
    footerBottomInfo: {
      slug: 'footer-bottom-info',
      response: <any>null,
      isRequesting: false
    },
    privacyPolicy: {
      slug: 'privacy-policy',
      response: <any>null,
      isRequesting: false
    },
    subscriptionAgreement: {
      slug: 'subscription-agreement',
      response: <any>null,
      isRequesting: false
    },
    termsAndConditions: {
      slug: 'terms',
      response: <any>null,
      isRequesting: false
    },
    contactInfo: {
      slug: 'contact-information',
      response: <any>null,
      isRequesting: false
    }
  };

  constructor(private httpClient: HttpClient) { }

  getContentFor(slug: string): Observable<any> {
    return this.httpClient.get(API_LIST.getStaticContent(slug));
  }
  checkAndSet(staticContentDataItem) {
    if (staticContentDataItem.response == null) {
      staticContentDataItem.isRequesting = true;
      this.getContentFor(staticContentDataItem.slug).subscribe((data) => {
        staticContentDataItem.isRequesting = false;
        staticContentDataItem.response = data;
      });
    }
  }

}

