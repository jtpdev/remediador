import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Remedio } from '../../models/remedio';

@IonicPage()
@Component({
  selector: 'page-cadastro-remedio',
  templateUrl: 'cadastro-remedio.html',
})
export class CadastroRemedioPage {

  remedio: Remedio;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.remedio = new Remedio();
  }

}
