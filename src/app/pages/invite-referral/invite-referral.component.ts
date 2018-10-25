import { Component, OnInit } from '@angular/core';
import { InviteService } from '../../services/invite/invite.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invite-referral',
  templateUrl: './invite-referral.component.html',
  styleUrls: ['./invite-referral.component.css']
})
export class InviteReferralComponent{
 
  constructor(private inviteService: InviteService, private route: ActivatedRoute, ) {
    this.inviteService.init(route.snapshot.params.ref_id);
  }
  
  ngAfterViewInit() {
    
  }

}
