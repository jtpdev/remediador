import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Remedio } from '../../models/remedio';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { RemedioProvider } from '../../providers/remedio/remedio';

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
    private barcodeScanner: BarcodeScanner,
    private remedioProvider: RemedioProvider
  ) {
    this.remedio = new Remedio();
  }

  chamarScanner() {
    if (!this.remedio.codigoBarras !== null) {
      this.barcodeScanner.scan().then(codigo => {
        this.remedio.codigoBarras = Number(codigo.text);
      }).catch(err => {
        console.log('Erro ao escanear o código', err);
      });
    }
  }

  podeSalvar(): boolean {
    return this.remedio.codigoBarras != null
      && this.remedio.horario != null
      && this.remedio.nome != null
      && this.remedio.qtdDias != null
      && this.remedio.vezesAoDia != null;
  }

  salvar() {
    this.remedioProvider.save(this.remedio)
      .then(remedio => {
        if (remedio) {
          this.navCtrl.pop();
        }
      });
  }

}
