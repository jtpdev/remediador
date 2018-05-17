import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Remedio } from '../../models/remedio';
import { RemedioProvider } from '../../providers/remedio/remedio';
import { CadastroRemedioPage } from '../cadastro-remedio/cadastro-remedio';
import { ConfiguracaoPage } from '../configuracao/configuracao';

@IonicPage()
@Component({
  selector: 'page-listagem-remedio',
  templateUrl: 'listagem-remedio.html',
})
export class ListagemRemedioPage {

  remedios: Remedio[];
  remedioPage: any;
  configuracaoPage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private remedioProvider: RemedioProvider
  ) {
    this.remedioPage = CadastroRemedioPage;
    this.configuracaoPage = ConfiguracaoPage;
  }

  ionViewDidEnter() {
    this.remedioProvider.list().then(remedios => {
      if (remedios) {
        this.remedios = remedios
      }
    });
  }

  chamarConfiguracao() {
    this.navCtrl.push(ConfiguracaoPage);
  }

}
