import { Component, OnInit } from '@angular/core';
import { AppService } from '../../global/app.service';
import { BetDto, BetService } from '../../providers/api-client.generated';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.page.html',
  styleUrls: ['./historic.page.scss'],
})
export class HistoricPage implements OnInit {

  betList: BetDto[]
  constructor(
    private betService: BetService,
    private appService: AppService,
  ) { }

  ngOnInit(): void {

  }

  ionViewDidEnter() {
    this.loadBets();

  }

  async loadBets() {
    const betResponse = await this.betService.getBets({ getBetRequest: { id_user: AppService.AuthUser.id } }).toPromise();
    if (betResponse.success)
      this.betList = betResponse.bets;
    console.log("🚀 ~ loadBets ~ this.betList", this.betList)
  }
}
