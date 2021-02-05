import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app'
import { AuthService } from 'src/app/services/auth.service';
import { DprtService } from 'src/app/services/dprt.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  auth = firebase.auth()
  user: any 
  dn: any
  u = 0
  db = firebase.firestore()

  constructor(
    private router: Router,
    private dprtS: DprtService,
    private authS: AuthService,
  ) { 
    // this.auth.onAuthStateChanged(user => {
    //   if(user){
    //     this.user = user
    //     this.u = 1;
    //   }
    // })
  }

  ngOnInit(): void {
    this.auth.onAuthStateChanged(user => {
      if(user){
        this.user = user
        this.dn = user.displayName  
        this.dprtS.departmentid = user.displayName
        this.authS.user = user
        //this.router.navigate(['/collegeadmin'])
      }else{
        //this.router.navigate(['/main2']) 
      }
    })
  }

  login(){
    this.router.navigate(['/login'])
  }

  go(){
    //this.router.navigate(['/collegeadmin'])
  }

  continue(){
    if(this.user){
      this.router.navigate(['/collegeadmin'])
    }else{
      this.router.navigate(['/main2'])
    }
  }

}
