import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Remedio } from '../../models/remedio';
import { RemedioProvider } from '../../providers/remedio/remedio';
import { CadastroRemedioPage } from '../cadastro-remedio/cadastro-remedio';
import { MenuComponent } from '../../components/menu/menu';

@IonicPage()
@Component({
  selector: 'page-listagem-remedio',
  templateUrl: 'listagem-remedio.html',
})
export class ListagemRemedioPage {

  remedios: Remedio[];
  remedioPage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private remedioProvider: RemedioProvider
  ) {
    this.remedioPage = CadastroRemedioPage;
  }

  ionViewDidLoad() {
    this.remedioProvider.list().then(remedios => {
      if (remedios) {
        this.remedios = remedios
      }
    });
  }

  apresentarMenu(evento) {
    let popover = this.popoverCtrl.create(MenuComponent);
    popover.present();
  }

}
