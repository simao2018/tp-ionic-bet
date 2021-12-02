import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BetService, MatchDto } from '../../providers/api-client.generated';
import { MatchService } from '../../providers/api-client.generated/api/match.service';
import { GetMatchList } from '../../providers/api-client.generated/model/getMatchList';
import { MatchSelectedDto } from '../../providers/api-client.generated/model/matchSelectedDto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  matchList: MatchDto[] = [];
  matchSelectedList: MatchSelectedDto[] = [];
  constructor(
    private matchService: MatchService,
  ) { }

  async ngOnInit() {
    const response: GetMatchList = await this.matchService.getMatchs().toPromise();
    this.matchList = response.matchs;
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
