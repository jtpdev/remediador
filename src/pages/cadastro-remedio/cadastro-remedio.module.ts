import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroRemedioPage } from './cadastro-remedio';

@NgModule({
  declarations: [
    CadastroRemedioPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroRemedioPage),
  ],
})
export class CadastroRemedioPageModule {}
