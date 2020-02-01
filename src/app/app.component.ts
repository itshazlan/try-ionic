import { Component, OnInit } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './services/api.service';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  selectedPath = "";
  public appPages = [
    {
      title: "Home",
      url: "/app/users",
      icon: "home"
    },
    {
      title: "About",
      url: "/about",
      icon: "list"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private api: ApiService,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.appPages.map(p => {
          return p['active'] = (event.url === p.url);
        });
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  async signOut() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: 'Are you sure want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'primary-btn'
        },
        {
          text: 'Logout',
          cssClass: 'danger-btn',
          handler: () => {
            this.api.logout();
          }
        }
      ]
    });

    await alert.present();
  }

}
