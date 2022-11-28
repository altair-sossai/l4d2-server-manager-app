import { Pipe, PipeTransform } from '@angular/core';
import { Campaign, CampaignName } from '../enums/campaign.enum';

@Pipe({
  name: 'campaign'
})
export class CampaignPipe implements PipeTransform {
  transform(campaign: Campaign): string {
    return CampaignName.get(campaign) || `${campaign}`;
  }
}
