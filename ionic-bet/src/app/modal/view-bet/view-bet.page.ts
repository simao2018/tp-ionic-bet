import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AppService } from '../../../global/app.service';
import { BasePage } from '../../../global/base.page';
import { BetDto, BetService, GetBetResponse, MatchDto, ResultDto, UserDto } from '../../../providers/api-client.generated';

@Component({
  selector: 'app-view-bet',
  templateUrl: './view-bet.page.html',
  styleUrls: ['./view-bet.page.scss'],
})
export class ViewBetPage extends BasePage implements OnInit {
  btn_validate: string = 'Valider mon pari';
  load_simulation: boolean = false;
  launchBetType: 'save' | 'simulate' | 'replay' = 'save';
  betResponse: GetBetResponse;
  matchsFinal: MatchDto[] = [];
  betState: 'gagné' | 'perdu' = null;
  public AppService = AppService;

  @Input('authUser') authUser: UserDto;

  constructor(
    public modalController: ModalController,
    private betService: BetService,
    public appService: AppService,
    private router: Router,
  ) {
    super();
    this.matchsFinal = [];
    this.betResponse = null;
    this.launchBetType = 'save';
    this.betState = null;

  }

  ngOnInit() {
    console.log('authUser :', this.authUser);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  removeMatchSelected(match_selected_id: string) {
    const index = this.authUser?.bets.find(x => x.state === BetDto.StateEnum.InProgress).matchsSelected.findIndex(y => y.id === match_selected_id);
    if (index !== -1) {
      this.authUser?.bets.find(x => x.state === BetDto.StateEnum.InProgress).matchsSelected.splice(index, 1);
    }
  }

  async launchBet(type: 'save' | 'simulate' | 'replay' = 'save') {
    this.loading = true;

    switch (type) {

      case 'save':
        const match_selected_list = this.authUser.bets.find(x => x.state === BetDto.StateEnum.InProgress).matchsSelected;
        const mise = this.authUser.bets.find(x => x.state === BetDto.StateEnum.InProgress).mise;
        this.authUser.bets.find(x => x.state === BetDto.StateEnum.InProgress).quote_total = this.appService.getTotalQuote(match_selected_list);
        this.authUser.bets.find(x => x.state === BetDto.StateEnum.InProgress).gain = this.appService.getPotentialWin(match_selected_list, mise);
        this.betResponse = await this.betService.saveBet({ betDto: this.authUser.bets.find(x => x.state === BetDto.StateEnum.InProgress) }).toPromise();

        if (this.betResponse.success) {
          this.btn_validate = 'Lancer la simulation';
          this.launchBetType = 'simulate';
          this.authUser.bets[0].ref = this.betResponse.bet.ref;
        }

        break;
      case 'simulate':
        if (this.betResponse) {

          const simulateResponse = await this.betService.simulateMatch({ betId: this.betResponse.bet.id }).toPromise();
          if (simulateResponse.success) {
            this.betResponse.bet = simulateResponse.bet;
            this.matchsFinal = simulateResponse.matchs;
            this.betState = simulateResponse.bet.result === BetDto.ResultEnum.Win ? 'gagné' : 'perdu';
            if (this.betState === 'gagné')
              AppService.userCredit.next(AppService.userCredit.value + simulateResponse.bet.gain);
          }
        }
        this.launchBetType = 'replay';
        this.btn_validate = 'Rejouer la partie'
        break;
      case 'replay':
        this.modalController.dismiss({ value: this.authUser });
        break;
    }


    this.loading = false;
  }

  getResultMatchFinal(idMatch: string) {
    return this.matchsFinal?.length && this.matchsFinal?.find(x => x.id === idMatch).result;
  }

  isMatchWin(result: ResultDto, id_match: string): boolean {
    if (!result || !id_match)
      return;

    const resultFinal = this.matchsFinal?.find(x => x.id === id_match)?.result;

    if (!resultFinal)
      return;

    return resultFinal.value === result.value ? true : false;
  }

  getBorderResultColor(result: ResultDto, id_match: string): string {
    if (!result || !id_match)
      return;

    return this.getResultMatchFinal(id_match) ? (this.isMatchWin(result, id_match) ? 'matchWin' : 'matchLost') : 'match_in_progress';
  }

}
