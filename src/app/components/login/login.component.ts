import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app'
import 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth = firebase.auth();
  un = ""
  pw = ""

  constructor(private router: Router, private authS: AuthService) { 

  }

  ngOnInit(): void {
  }

  submit(){
    this.auth.signInWithEmailAndPassword(this.un, this.pw).then(user => {
      if(user){
        this.authS.user = user
        this.router.navigate(['/collegeadmin'])
      }
    }).catch(err => {
      alert(err)
    })
  }

}
