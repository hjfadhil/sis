import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app'

@Component({
  selector: 'app-main3',
  templateUrl: './main3.component.html',
  styleUrls: ['./main3.component.css']
})
export class Main3Component implements OnInit {

  auth = firebase.auth();
  user: number = 0

  constructor(private router: Router) { 
    console.log('Main3');
    
    this.auth.onAuthStateChanged(user => {
      if(user){
        this.user = 1
        console.log(this.user);
        this.router.navigate(['/main'])
        // this.router.navigate(['/collegeadmin']).then(() => {
        //   this.router.navigate([''])
        // })
      }else{
        this.user = 2
        this.router.navigate(['/main2'])
      }
    })
  }

  ngOnInit(): void {
  }

}
