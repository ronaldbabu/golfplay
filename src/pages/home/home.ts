import { Component, OnInit } from '@angular/core';
import { Nav, App, Platform, LoadingController, AlertController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser'
import { StatusBar } from '@ionic-native/status-bar';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  url: string;
  count: number = 0;
  constructor(public nav: Nav, public app: App, private iab: InAppBrowser, private loadingCtrl: LoadingController, public platform: Platform, public statusBar: StatusBar, private push: Push, private alert: AlertController) {
    platform.ready().then(() => {
      if (platform.is('android')) {
        statusBar.overlaysWebView(false);
        statusBar.backgroundColorByHexString('#3e497f');
      }
    });


    platform.registerBackButtonAction(() => {

      let nav = app.getActiveNavs()[0];
      let activeView = nav.getActive();
      if (activeView.name === "HomePage") {

        if (nav.canGoBack()) {
          nav.pop();
        } else {
          if (this.count == 0) {
            const alert = this.alert.create({
              title: 'Confirmation',
              message: 'Do you want to close the app?',
              buttons: [{
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Application exit prevented!');
                  this.count = 0;
                }
              }, {
                text: 'Close App',
                handler: () => {
                  this.platform.exitApp(); // Close this application
                }
              }]
            });
            alert.present();
          }
          this.count++;
        }
      }
      else {
        nav.pop();
      }

    }, 5);

    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
          this.initPush();
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });

  }

  //Push Notifications

  initPush() {
    const options: PushOptions = {
      android: {},
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      const confirm = this.alert.create({
        title: 'New Notification',
        message: notification.message,
        buttons: [
          {
            text: 'Close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      confirm.present();

    });

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  // Search Webpages

  openWebpage(url) {

    const options: InAppBrowserOptions = {
      zoom: 'no',
      toolbar: 'no',
      location: 'no'
    }
    let newUrl = 'http://' + url;
    const browser = this.iab.create(newUrl, '_self', options);


  }



}
