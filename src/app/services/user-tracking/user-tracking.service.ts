import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as envJson from '../../../config/env.json';
const LIVE_AGENT_ENABLED = envJson.default.live_agent_enabled;

@Injectable({
  providedIn: 'root'
})
export class UserTrackingService {

  constructor(private authService: AuthService) {

  }

  createScript1(globalUserId, globalAcquisitionChannel, globalAcquisitionCampaignChannel, estimatedCountry) {
    this.deleteScript1();
    const script_1 = document.createElement('script');
    script_1.id = 'userVarsScript';
    script_1.innerHTML = `
      var globalUserId = ${globalUserId};
      var globalAcquisitionChannel = ${ !globalAcquisitionChannel ? null : JSON.stringify(globalAcquisitionChannel) };
      var globalAcquisitionCampaignChannel =
      ${ !globalAcquisitionCampaignChannel ? null : JSON.stringify(globalAcquisitionCampaignChannel) };
      var estimatedCountry = ${ estimatedCountry == null ? null : JSON.stringify(estimatedCountry.code)};
    `;
    document.head.insertBefore(script_1, document.head.firstChild);
  }
  deleteScript1() {
    const elem = document.getElementById('userVarsScript');
    if (elem != null) {
      elem.parentNode.removeChild(elem);
    }
  }

  createScript4() {
    const script_4 = document.createElement('script');
    script_4.innerHTML = `
      (function(d, src, c) {
        var t=d.scripts[d.scripts.length - 1],
        s=d.createElement('script');
        s.id='la_x2s6df8d';
        s.async=true;
        s.src=src;
        s.onload=s.onreadystatechange=function() {
          var rs=this.readyState;
          if(rs&&(rs!='complete')&&(rs!='loaded')) {
            return;
          }c(this);
        };
        t.parentElement.insertBefore(s,t.nextSibling);
      })(document, 'https://wshful.ladesk.com/scripts/track.js', function(e){
        LiveAgent.createButton('9a06e410', e);
      });`;
    document.head.appendChild(script_4);
  }

  appendHeadScripts() {
    if (this.authService.isLoggedIn()) {
      this.authService.requestCurrentSessionDataObs.subscribe((user) => {
        this.createScript1(user.id, user.acquisition, user.acquisition_campaign, user.country);

        if (LIVE_AGENT_ENABLED) {
          this.createScript4();
        }
      });
    } else {
      this.createScript1(null, null, null, null);

      if (LIVE_AGENT_ENABLED) {
        this.createScript4();
      }
    }
  }
}
