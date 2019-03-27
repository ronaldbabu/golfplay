import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Events } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: any;
  authForm: FormGroup;
  usrData: any;
  check: boolean = true;

  constructor(public events: Events, private fb: FormBuilder, public alertCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams, public http: HTTP,
    private loadingCtrl: LoadingController, private storage: Storage
    ) {

    this.authForm = fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'password': [null, Validators.compose([Validators.required])]
    });
  }
 

  login() {

    this.navCtrl.setRoot(HomePage)

    // let loader = this.loadingCtrl.create({
    //   spinner: 'crescent',
    //   content: "Loading..",
    // });
    // loader.present();

    // let data = {
    //   'username': this.username,
    //   'password': this.password,
     
    // };
    // let headers = {
    //   'Content-Type': 'application/json'
    // };

    // this.http.post('/api/login', data, headers)
    //   .then((data) => {
    //     let val = JSON.parse(data.data);
    //     if (val.resp == "0") {
    //       const alert = this.alertCtrl.create({
    //         title: 'Error!',
    //         subTitle: 'Invalid Login Credential',
    //         buttons: ['OK']
    //       });
    //     }
    //     else if (val.resp == "1") {
    //       this.usrData = { username: val.username, password: val.password, uid: val.uid };
    //       this.storage.set('userData', this.usrData);
    //       this.storage.set('loginCheck', this.check);
    //       this.navCtrl.setRoot(HomePage);
    //     }
    //     loader.dismiss();
    //   })
    //   .catch((error) => {
    //     const alert = this.alertCtrl.create({
    //       title: 'Error!',
    //       subTitle: 'Please Try Again',
    //       buttons: ['OK']
    //     });
    //     alert.present();
    //   });
    // loader.dismiss();
  } 
}
