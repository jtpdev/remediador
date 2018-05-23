import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { SQLite } from '@ionic-native/sqlite';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CadastroRemedioPageModule } from '../pages/cadastro-remedio/cadastro-remedio.module';
import { RemedioProvider } from '../providers/remedio/remedio';
import { DaoProvider } from '../providers/dao/dao';
import { ListagemRemedioPageModule } from '../pages/listagem-remedio/listagem-remedio.module';
import { ConfiguracaoPageModule } from '../pages/configuracao/configuracao.module';
import { ConfiguracaoProvider } from '../providers/configuracao/configuracao';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    CadastroRemedioPageModule,
    ListagemRemedioPageModule,
    ConfiguracaoPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemedioProvider,
    DaoProvider,
    SQLite,
    BarcodeScanner,
    ConfiguracaoProvider,
    LocalNotifications
  ]
})
export class AppModule {}
