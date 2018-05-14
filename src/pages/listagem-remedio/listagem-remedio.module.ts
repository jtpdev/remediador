import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListagemRemedioPage } from './listagem-remedio';

@NgModule({
  declarations: [
    ListagemRemedioPage,
  ],
  imports: [
    IonicPageModule.forChild(ListagemRemedioPage),
  ],
})
export class ListagemRemedioPageModule {}
