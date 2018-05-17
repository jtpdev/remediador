import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListagemRemedioPage } from '../pages/listagem-remedio/listagem-remedio';
import { DaoProvider } from '../providers/dao/dao';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = ListagemRemedioPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    daoProvider: DaoProvider
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      daoProvider.criar()
        .then(() => {
          splashScreen.hide();
        })
        .catch(() => {
          splashScreen.hide();
        });
    });
  }
}

