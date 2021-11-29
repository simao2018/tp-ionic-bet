import { Component } from '@angular/core';
import { BetService, MatchDto } from '../../providers/api-client.generated';
import { MatchService } from '../../providers/api-client.generated/api/match.service';
import { GetMatchList } from '../../providers/api-client.generated/model/getMatchList';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  matchList: MatchDto[] = [];
  constructor(
    private matchService: MatchService,
  ) { }

  async ngOnInit() {
    console.log(`load api request`);
    const response: GetMatchList = await this.matchService.getMatchs().toPromise();
    if (response.success)
      console.log('matchs : ', response.matchs);

    this.matchList = response.matchs;

  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
