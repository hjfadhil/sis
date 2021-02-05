import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app'

@Component({
  selector: 'app-collegeadmin2',
  templateUrl: './collegeadmin2.component.html',
  styleUrls: ['./collegeadmin2.component.css']
})
export class Collegeadmin2Component implements OnInit {

  auth = firebase.auth();

  constructor(private router: Router) { 

  }

  ngOnInit(): void {
  }

  logout(){
    this.auth.signOut()
  }

  stdslist(){
    console.log('helllo');
    
    this.router.navigate(['/waiting', {outlets:{'cadmin':['collegeadmin2', {outlets:{'coladmin':['coladmin']}}]}}])
  }

}
