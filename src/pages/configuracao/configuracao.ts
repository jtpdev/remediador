import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Configuracao } from '../../models/configuracao';
import { ConfiguracaoProvider } from '../../providers/configuracao/configuracao';

@IonicPage()
@Component({
  selector: 'page-configuracao',
  templateUrl: 'configuracao.html',
})
export class ConfiguracaoPage {

  configuracao: Configuracao;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private confProvider: ConfiguracaoProvider
  ) {
    this.configuracao = new Configuracao();
  }

  ionViewDidLoad(){
   this.confProvider.list().then(confs => {
     if(confs){
       this.configuracao = confs[0];
     }
   })
  }

  salvarAlteracao(valor: boolean) {
    this.configuracao.pararComEscaneamento = valor;
    const acao: (value: any) => void | PromiseLike<void> = conf => {
      this.configuracao = conf;
    };
    if(this.configuracao.id) {
      this.confProvider.update(this.configuracao).then(acao);
    } else {
      this.confProvider.save(this.configuracao).then(acao);
    }
  }
}
