import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular'; 
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    @ViewChild('register_modal') register_modal!: IonModal;
    @ViewChild('login_modal') login_modal!: IonModal;

    registerForm: FormGroup;
    loginForm: FormGroup;

    constructor(private auth: AuthService) {
    this.registerForm = new FormGroup({
      reg_email: new FormControl<string | null>('', [Validators.required, Validators.email]),
      reg_username: new FormControl<string | null>('', [Validators.required, Validators.minLength(3)]),
      reg_password: new FormControl<string | null>('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[\S]{6,}$/)]),
    });

    this.loginForm = new FormGroup({
      log_email: new FormControl<string | null>('', [Validators.required, Validators.email]), 
      log_password: new FormControl<string | null>('', [Validators.required, Validators.minLength(1)]),
    });
  }

  get reg_email() {return this.registerForm.get('reg_email');} 
  get reg_username() {return this.registerForm.get('reg_username');} 
  get reg_password() {return this.registerForm.get('reg_password');}

  get log_email() {return this.loginForm.get('log_email');} 
  get log_password() {return this.loginForm.get('log_password');} 

  ngOnInit() {
  }

    register_cancel() {
    this.register_modal.dismiss(null, 'cancel');
  }

  register_confirm() { 
    if (this.registerForm.valid) { 
      this.auth.createUserWithEmailAndPassword(this.reg_email!.value, this.reg_password!.value, this.reg_username!.value);
    }
  }

  login_cancel() {
    this.login_modal.dismiss(null, 'cancel'); 
  }

  login_confirm() {  
    if (this.loginForm.valid) { 
      this.auth.signInWithEmailAndPassword(this.log_email!.value, this.log_password!.value);
    }
  } 

}
