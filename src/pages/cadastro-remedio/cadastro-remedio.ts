import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Remedio } from '../../models/remedio';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-cadastro-remedio',
  templateUrl: 'cadastro-remedio.html',
})
export class CadastroRemedioPage {

  remedio: Remedio;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner
  ) {
    this.remedio = new Remedio();
  }

  chamarScanner() {
    if (!this.remedio.codigoBarras) {
      this.barcodeScanner.scan().then(codigo => {
        this.remedio.codigoBarras = Number(codigo.text);
      }).catch(err => {
        console.log('Erro ao escanear o código', err);
      });
    }
  }

}
