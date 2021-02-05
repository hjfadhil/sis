import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent implements OnInit {

  auth = firebase.auth();

  constructor(private router: Router) {
    this.auth.onAuthStateChanged((user) => {
      if(user){
        this.router.navigate(['/waiting', {outlets:{'cadmin':['collegeadmin']}}])
      }else{
        this.router.navigate(['/main'])
      }
    }) 
  }

  ngOnInit(): void {
  }

}
