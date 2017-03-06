import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NavController, NavParams, AlertController, App, MenuController, ToastController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import {TranslateService} from 'ng2-translate';
import { UserPage } from './user';
import { RecoverPage } from './recover';
import { FiresPage } from '../fire/fires';
import BasePage from '../basepage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage extends BasePage {
  loginForm: FormGroup;

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public userService: UserService,
    public translateService: TranslateService, public alertCtrl: AlertController, public menuCtrl: MenuController,
    public fb: FormBuilder, public toastCtrl: ToastController) {
    super();
    this.loginForm = fb.group({
      'username': [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ],
      'password': [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    if (localStorage["profile"]) {
      this.openPage(FiresPage);
    }
  }

  afterLogin() {
    if ('deviceToken' in localStorage)
      this.userService.storeDeviceToken('android', localStorage['deviceToken']);
    this.openPage(FiresPage);
    this.setMenu();
  }

  loginPage(form) {
    this.login(form.username, form.password);
  }

  register() {
    this.navCtrl.push(UserPage);
  }

  recover(form) {
    this.showConfirm(this.translate("user.recover.confirm") + form.username,
      this.translate("user.recover.title"), () => {
        this.userService.recover(form.username).then(r => {
          this.showToast(this.translate("user.recover.response"));
        }); 
      });
  }

}
