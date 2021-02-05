import { Component } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { DprtService } from 'src/app/services/dprt.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  auth = firebase.auth();
  authstate = 0
  user: number = 0

  constructor(private router: Router,
  ){
    this.auth.onAuthStateChanged(user => {
      if(user){
        //this.router.navigate(['/main'])
        // this.router.navigate(['/collegeadmin']).then(() => {
        //   this.router.navigate([''])
        // })
      }else{
        this.user = 2
        //this.router.navigate(['/main2'])
      }
    })
    // this.auth.onAuthStateChanged(user => {
    //   if(user){
    //     this.authstate = 1
    //     let com = user.email?.split('@')[1]
    //     if(com == "exam.com"){
    //       console.log(this.authstate);
    //       this.authS.user = user
    //       this.dprtService.setDepartment(user.displayName)
    //       this.router.navigate(['/collegeadmin'])
    //     }else{
    //       //this.router.navigate(['studentreg'])
    //     }
    //   }else{
    //     this.authstate = 2
    //     console.log(2);
        
    //     this.router.navigate(['/main'])
    //   }
    // })
    // this.auth.onAuthStateChanged(user => {
    //   // if(user){
    //   //   this.router.navigate(['/collegeadmin'])
    //   // }else{
    //   // }
    // })
    //this.router.navigate(['/main'])
    
  }
}
