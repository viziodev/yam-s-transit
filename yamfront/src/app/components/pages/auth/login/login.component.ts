import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/api/auth.service";
import {TokenService} from "../../../../services/api/token-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]],
    })
  }
  login(){
  this.authService.loginCheck(this.loginForm.value).subscribe(
    (data: any) =>{
      if(data){
        this.tokenService.setLocalStorageToken(data.token)
      }
    }
  )
  }
}
