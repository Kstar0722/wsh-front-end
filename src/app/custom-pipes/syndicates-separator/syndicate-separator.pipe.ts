import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'syndicateSeparator'
})
export class SyndicateSeparatorPipe implements PipeTransform {

  transform(memberships: any, type: string): any {
    let result = [];
    memberships.forEach(membership => {
      if (membership.syndicate.type == type){
        result.push(membership);
      }
    });
    return result;
  }

}
