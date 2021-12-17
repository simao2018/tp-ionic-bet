import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BasePage } from '../../global/base.page';
import { BetDto, BetService, MatchDto, ResultDto, UserDto } from '../../providers/api-client.generated';
import { MatchService } from '../../providers/api-client.generated/api/match.service';
import { GetMatchList } from '../../providers/api-client.generated/model/getMatchList';
import { MatchSelectedDto } from '../../providers/api-client.generated/model/matchSelectedDto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends BasePage {

  matchList: MatchDto[] = [];
  matchSelectedList: MatchSelectedDto[] = [];
  bet: BetDto;
  user: UserDto;
  constructor(
    private matchService: MatchService,
  ) {
    super();
  }

  async ngOnInit() {
    this.user = this.AuthUser;

    console.log("🚀 ~ ngOnInit ~ this.user", this.user)
    const response: GetMatchList = await this.matchService.getMatchs().toPromise();
    this.matchList = response.matchs;
  }

  segmentChanged(ev: any, match: MatchDto, matchIndex: number) {
    if (this.matchSelectedList?.length) {
      const index = this.matchSelectedList.findIndex(x => x.id_match === match.id);
      if (index !== -1)
        this.matchSelectedList.splice(index, 1);
    }

    let resultValue: ResultDto.ValueEnum;

    switch (ev.detail.value) {
      case match.id_team_home:
        resultValue = ResultDto.ValueEnum.Home;
        break;
      case match.id_team_away:
        resultValue = ResultDto.ValueEnum.Away;
        break;
      case match.id + '_' + matchIndex:
        resultValue = ResultDto.ValueEnum.Draw;
        break;
      default:
        resultValue = ResultDto.ValueEnum.Unset;
    }

    this.matchSelectedList.push({
      id_match: match.id,
      result: { type: ResultDto.TypeEnum.User, value: resultValue },
      match: match,
    })

    if (this.matchSelectedList) {
      this.AuthUser.bets.find(x => x.state === BetDto.StateEnum.InProgress).matchsSelected = this.matchSelectedList;


    }
  }

}
